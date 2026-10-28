import {HeaderComponent} from "../../components/header/index.js";
import {ChatFilterComponent} from "../../components/chat-filter/index.js";
import {KitchenChatCardComponent} from "../../components/kitchen-chat-card/index.js";
import {KitchenChatPage} from "../kitchen-chat/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {normalizeConversations} from "../../modules/chats.js";

export class KitchenChatsPage {
    constructor(parent) {
        this.parent = parent
    }

    get chatsRoot() {
        return document.getElementById('chats-grid')
    }

    getHTML() {
        return (
            `
                <div class="page">
                    <div class="page-head">
                        <h1 class="page-title">Чаты точки</h1>
                    </div>
                    <div id="chat-filter-place"></div>
                    <div id="chats-status" class="chats-status"></div>
                    <div id="chats-grid" class="menu-grid"></div>
                </div>
            `
        )
    }

    getKitchenChats(chatFilter) {
        this.currentFilter = chatFilter
        this.showStatus('Загрузка...')
        ajax.post(urls.getConversations(chatFilter), (response) => {
            if (!this.chatsRoot || chatFilter !== this.currentFilter) {
                return
            }
            const kitchenChats = normalizeConversations(response)
            if (kitchenChats.length === 0) {
                this.chatsRoot.innerHTML = ''
                this.showStatus('Чатов нет')
                return
            }
            this.showStatus('')
            this.renderKitchenChats(kitchenChats)
        }, (message) => {
            if (!this.chatsRoot || chatFilter !== this.currentFilter) {
                return
            }
            this.showStatus(message)
        })
    }

    showStatus(status) {
        document.getElementById('chats-status').textContent = status
    }

    renderKitchenChats(kitchenChats) {
        this.chatsRoot.innerHTML = ''
        kitchenChats.forEach((kitchenChat) => {
            const kitchenChatCard = new KitchenChatCardComponent(this.chatsRoot)
            kitchenChatCard.render(kitchenChat, this.clickOpen.bind(this))
        })
    }

    clickOpen(e) {
        const kitchenChatPage = new KitchenChatPage(this.parent, e.target.dataset.peerId)
        kitchenChatPage.render()
    }

    renderFilter(activeFilter) {
        const chatFilter = new ChatFilterComponent(document.getElementById('chat-filter-place'))
        chatFilter.render(activeFilter, this.changeFilter.bind(this))
    }

    changeFilter(chatFilter) {
        this.renderFilter(chatFilter)
        this.getKitchenChats(chatFilter)
    }

    clickHome() {
        this.render()
    }

    render() {
        this.parent.innerHTML = ''
        const header = new HeaderComponent(this.parent)
        header.render(this.clickHome.bind(this))

        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

        this.renderFilter('all')
        this.getKitchenChats('all')
    }
}

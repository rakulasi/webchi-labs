import {HeaderComponent} from "../../components/header/index.js";
import {KitchenChatComponent} from "../../components/kitchen-chat/index.js";
import {KitchenChatsPage} from "../kitchen-chats/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {normalizeConversation} from "../../modules/chats.js";

export class KitchenChatPage {
    constructor(parent, peerId) {
        this.parent = parent
        this.peerId = peerId
    }

    get chatRoot() {
        return document.getElementById('kitchen-chat-page')
    }

    isActual() {
        return this.chatRoot && this.chatRoot.dataset.peerId === this.peerId
    }

    getHTML() {
        return (
            `
                <div id="kitchen-chat-page" class="page">
                    <div id="chat-status" class="chats-status"></div>
                </div>
            `
        )
    }

    getKitchenChat() {
        this.showStatus('Загрузка...')
        ajax.post(urls.getConversationById(this.peerId), (response) => {
            if (!this.isActual()) {
                return
            }
            if (response.items.length === 0) {
                this.showStatus('Чат не найден')
                return
            }
            this.showStatus('')
            const profiles = response.profiles || []
            this.renderKitchenChat(normalizeConversation(response.items[0], null, profiles))
        }, (message) => {
            if (!this.isActual()) {
                return
            }
            this.showStatus(message)
        })
    }

    showStatus(status) {
        document.getElementById('chat-status').textContent = status
    }

    renderKitchenChat(kitchenChat) {
        const kitchenChatView = new KitchenChatComponent(this.chatRoot)
        kitchenChatView.render(kitchenChat)
    }

    clickHome() {
        const kitchenChatsPage = new KitchenChatsPage(this.parent)
        kitchenChatsPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        const header = new HeaderComponent(this.parent)
        header.render(this.clickHome.bind(this))

        this.parent.insertAdjacentHTML('beforeend', this.getHTML())
        this.chatRoot.dataset.peerId = this.peerId

        this.getKitchenChat()
    }
}

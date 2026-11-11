import {HeaderComponent} from "../../components/header/index.js";
import {CrepeFormComponent} from "../../components/crepe-form/index.js";
import {MenuPage} from "../menu/index.js";
import {ajax} from "../../modules/ajax.js";
import {crepeUrls} from "../../modules/crepeUrls.js";
import {normalizeCrepe} from "../../modules/crepeData.js";

const emptyCrepe = {
    code: '',
    title: '',
    category: 'Сладкие крепы',
    photo: '',
    crepePrice: '',
    packaging: {name: '', cost: 0},
    ingredients: [{name: '', net: '', loss: 0, pricePerKg: '', unit: 'кг'}]
}

export class CrepeFormPage {
    constructor(parent, crepeId) {
        this.parent = parent
        this.crepeId = crepeId
    }

    get formRoot() {
        return document.getElementById('crepe-form-page')
    }

    isActual() {
        return this.formRoot && this.formRoot.dataset.crepeId === String(this.crepeId)
    }

    getHTML() {
        const title = this.crepeId ? 'Редактирование позиции' : 'Новая позиция меню'
        return (
            `
                <div id="crepe-form-page" class="page" data-crepe-id="${this.crepeId}">
                    <div class="page-head">
                        <h1 class="page-title">${title}</h1>
                    </div>
                    <p id="crepe-form-status" class="menu-status"></p>
                </div>
            `
        )
    }

    showStatus(message) {
        document.getElementById('crepe-form-status').textContent = message
    }

    renderForm(crepe) {
        const crepeForm = new CrepeFormComponent(this.formRoot)
        crepeForm.render(crepe)
    }

    getCrepe() {
        this.showStatus('Загрузка позиции...')
        ajax.get(crepeUrls.getCrepeById(this.crepeId), (crepe) => {
            if (!this.isActual()) {
                return
            }
            this.showStatus(`Позиция [${crepe.code}] загружена с сервера`)
            this.renderForm(normalizeCrepe(crepe))
        }, (message) => {
            if (!this.isActual()) {
                return
            }
            this.showStatus(message)
        })
    }

    clickHome() {
        const menuPage = new MenuPage(this.parent)
        menuPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        const header = new HeaderComponent(this.parent)
        header.render(this.clickHome.bind(this))

        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

        if (this.crepeId) {
            this.getCrepe()
        } else {
            this.renderForm(emptyCrepe)
        }
    }
}

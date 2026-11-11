import {HeaderComponent} from "../../components/header/index.js";
import {TechCardComponent} from "../../components/tech-card/index.js";
import {MenuPage} from "../menu/index.js";
import {CrepeFormPage} from "../crepe-form/index.js";
import {ajax} from "../../modules/ajax.js";
import {crepeUrls} from "../../modules/crepeUrls.js";
import {normalizeCrepe} from "../../modules/crepeData.js";

export class TechCardPage {
    constructor(parent, crepeId) {
        this.parent = parent
        this.crepeId = crepeId
    }

    get techCardRoot() {
        return document.getElementById('tech-card-page')
    }

    isActual() {
        return this.techCardRoot && Number(this.techCardRoot.dataset.crepeId) === this.crepeId
    }

    getHTML() {
        return (
            `
                <div id="tech-card-page" class="page" data-crepe-id="${this.crepeId}">
                    <div class="page-head">
                        <p id="tech-card-status" class="menu-status"></p>
                        <button id="edit-crepe-button" class="btn btn-dark" type="button">Редактировать</button>
                    </div>
                </div>
            `
        )
    }

    showStatus(message) {
        document.getElementById('tech-card-status').textContent = message
    }

    getCrepe() {
        this.showStatus('Загрузка техкарты...')
        ajax.get(crepeUrls.getCrepeById(this.crepeId), (crepe) => {
            if (!this.isActual()) {
                return
            }
            this.showStatus('')
            const techCard = new TechCardComponent(this.techCardRoot)
            techCard.render(normalizeCrepe(crepe))
        }, (message) => {
            if (!this.isActual()) {
                return
            }
            this.showStatus(message)
        })
    }

    clickEdit() {
        const crepeFormPage = new CrepeFormPage(this.parent, this.crepeId)
        crepeFormPage.render()
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
        document.getElementById('edit-crepe-button').addEventListener('click', this.clickEdit.bind(this))

        this.getCrepe()
    }
}

import {HeaderComponent} from "../../components/header/index.js";
import {MenuFilterComponent} from "../../components/menu-filter/index.js";
import {CrepeCardComponent} from "../../components/crepe-card/index.js";
import {TechCardPage} from "../tech-card/index.js";
import {CrepeFormPage} from "../crepe-form/index.js";
import {ajax} from "../../modules/ajax.js";
import {crepeUrls} from "../../modules/crepeUrls.js";
import {normalizeCrepe} from "../../modules/crepeData.js";
import {getFoodCost} from "../../modules/calc.js";
import {foodCostLimit} from "../../modules/consts.js";

export class MenuPage {
    constructor(parent) {
        this.parent = parent
        this.menuFilter = {title: '', crepeLimit: null, onlyHighFoodCost: false}
        this.crepes = []
        this.requestNumber = 0
    }

    get menuRoot() {
        return document.getElementById('menu-grid')
    }

    getHTML() {
        return (
            `
                <div class="page">
                    <div class="page-head">
                        <h1 class="page-title">Меню и техкарты</h1>
                        <div class="page-head__actions">
                            <button id="new-crepe-button" class="btn btn-dark" type="button">+ Новая позиция</button>
                            <button id="add-crepe-button" class="btn btn-outline-dark" type="button">Копия первой позиции</button>
                        </div>
                    </div>
                    <div id="menu-filter-place"></div>
                    <p id="menu-status" class="menu-status"></p>
                    <div id="menu-grid" class="menu-grid"></div>
                </div>
            `
        )
    }

    showStatus(message) {
        document.getElementById('menu-status').textContent = message
    }

    getCrepes() {
        this.requestNumber += 1
        const requestNumber = this.requestNumber
        this.showStatus('Загрузка меню...')
        ajax.get(crepeUrls.getCrepes(this.menuFilter.title), (crepes) => {
            if (requestNumber !== this.requestNumber || !this.menuRoot) {
                return
            }
            this.crepes = crepes.map(normalizeCrepe)
            this.renderCrepes()
        }, (message) => {
            if (requestNumber !== this.requestNumber || !this.menuRoot) {
                return
            }
            this.crepes = []
            this.menuRoot.innerHTML = ''
            this.showStatus(message)
        })
    }

    getVisibleCrepes() {
        const foodCostCrepes = this.crepes.filter((crepe) => {
            return !this.menuFilter.onlyHighFoodCost || getFoodCost(crepe) > foodCostLimit
        })
        return this.menuFilter.crepeLimit ? foodCostCrepes.slice(0, this.menuFilter.crepeLimit) : foodCostCrepes
    }

    renderCrepes() {
        this.menuRoot.innerHTML = ''
        const visibleCrepes = this.getVisibleCrepes()
        this.showStatus(visibleCrepes.length > 0
            ? `Показано ${visibleCrepes.length} из ${this.crepes.length}`
            : 'Позиции не найдены')

        visibleCrepes.forEach((crepe) => {
            const crepeCard = new CrepeCardComponent(this.menuRoot)
            crepeCard.render(crepe, this.clickOpen.bind(this), this.clickDelete.bind(this))
        })
    }

    changeFilter(menuFilter) {
        const titleChanged = menuFilter.title !== this.menuFilter.title
        this.menuFilter = menuFilter
        if (titleChanged) {
            this.getCrepes()
        } else {
            this.renderCrepes()
        }
    }

    clickAdd() {
        const firstCrepe = this.crepes[0]
        if (!firstCrepe) {
            this.showStatus('Нечего копировать: список пуст')
            return
        }
        const {id, ...crepeData} = firstCrepe
        crepeData.title = `${firstCrepe.title} (копия)`
        ajax.post(crepeUrls.createCrepe(), crepeData, () => {
            this.getCrepes()
        }, (message) => {
            this.showStatus(message)
        })
    }

    clickDelete(e) {
        const crepeId = Number(e.target.dataset.crepeId)
        ajax.delete(crepeUrls.removeCrepeById(crepeId), () => {
            this.getCrepes()
        }, (message) => {
            this.showStatus(message)
        })
    }

    clickOpen(e) {
        const crepeId = Number(e.target.dataset.crepeId)
        const techCardPage = new TechCardPage(this.parent, crepeId)
        techCardPage.render()
    }

    clickNew() {
        const crepeFormPage = new CrepeFormPage(this.parent, null)
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
        document.getElementById('new-crepe-button').addEventListener('click', this.clickNew.bind(this))
        document.getElementById('add-crepe-button').addEventListener('click', this.clickAdd.bind(this))

        const menuFilter = new MenuFilterComponent(document.getElementById('menu-filter-place'))
        menuFilter.render(this.changeFilter.bind(this))

        this.getCrepes()
    }
}

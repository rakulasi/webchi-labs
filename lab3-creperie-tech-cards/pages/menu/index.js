import {HeaderComponent} from "../../components/header/index.js";
import {MenuFilterComponent} from "../../components/menu-filter/index.js";
import {CrepeCardComponent} from "../../components/crepe-card/index.js";
import {TechCardPage} from "../tech-card/index.js";
import {crepes} from "../../mock/crepes.js";
import {getFoodCost} from "../../modules/calc.js";
import {foodCostLimit} from "../../modules/consts.js";

export class MenuPage {
    constructor(parent) {
        this.parent = parent
        this.menuFilter = {title: '', onlyHighFoodCost: false}
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
                        <button id="add-crepe-button" class="btn btn-dark" type="button">+ Копия первой позиции</button>
                    </div>
                    <div id="menu-filter-place"></div>
                    <p id="menu-status" class="menu-status"></p>
                    <div id="menu-grid" class="menu-grid"></div>
                </div>
            `
        )
    }

    getFilteredCrepes() {
        const title = this.menuFilter.title.trim().toLowerCase()
        return crepes.filter((crepe) => {
            const titleMatches = crepe.title.toLowerCase().includes(title)
            const foodCostMatches = !this.menuFilter.onlyHighFoodCost || getFoodCost(crepe) > foodCostLimit
            return titleMatches && foodCostMatches
        })
    }

    renderCrepes() {
        this.menuRoot.innerHTML = ''
        const visibleCrepes = this.getFilteredCrepes()
        document.getElementById('menu-status').textContent = `Показано ${visibleCrepes.length} из ${crepes.length}`
        document.getElementById('add-crepe-button').disabled = crepes.length === 0

        visibleCrepes.forEach((crepe) => {
            const crepeCard = new CrepeCardComponent(this.menuRoot)
            crepeCard.render(crepe, this.clickOpen.bind(this), this.clickDelete.bind(this))
        })
    }

    changeFilter(menuFilter) {
        this.menuFilter = menuFilter
        this.renderCrepes()
    }

    clickAdd() {
        if (crepes.length === 0) {
            return
        }
        const firstCrepe = crepes[0]
        const newId = Math.max(...crepes.map((crepe) => crepe.id)) + 1
        const crepeCopy = {
            ...firstCrepe,
            id: newId,
            title: `${firstCrepe.title} (копия)`,
            packaging: {...firstCrepe.packaging},
            ingredients: firstCrepe.ingredients.map((ingredient) => ({...ingredient}))
        }
        crepes.push(crepeCopy)
        this.renderCrepes()
    }

    clickDelete(e) {
        const crepeId = Number(e.target.dataset.crepeId)
        const index = crepes.findIndex((crepe) => crepe.id === crepeId)
        if (index !== -1) {
            crepes.splice(index, 1)
        }
        this.renderCrepes()
    }

    clickOpen(e) {
        const crepeId = Number(e.target.dataset.crepeId)
        const techCardPage = new TechCardPage(this.parent, crepeId)
        techCardPage.render()
    }

    clickHome() {
        this.menuFilter = {title: '', onlyHighFoodCost: false}
        this.render()
    }

    render() {
        this.parent.innerHTML = ''
        const header = new HeaderComponent(this.parent)
        header.render(this.clickHome.bind(this))

        this.parent.insertAdjacentHTML('beforeend', this.getHTML())
        document.getElementById('add-crepe-button').addEventListener('click', this.clickAdd.bind(this))

        const menuFilter = new MenuFilterComponent(document.getElementById('menu-filter-place'))
        menuFilter.render(this.changeFilter.bind(this))

        this.renderCrepes()
    }
}

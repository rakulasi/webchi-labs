import {HeaderComponent} from "../../components/header/index.js";
import {TechCardComponent} from "../../components/tech-card/index.js";
import {MenuPage} from "../menu/index.js";
import {crepes} from "../../mock/crepes.js";

export class TechCardPage {
    constructor(parent, crepeId) {
        this.parent = parent
        this.crepeId = crepeId
    }

    get techCardRoot() {
        return document.getElementById('tech-card-page')
    }

    getHTML() {
        return (
            `
                <div id="tech-card-page" class="page"></div>
            `
        )
    }

    getCrepe() {
        return crepes.find((menuCrepe) => menuCrepe.id === this.crepeId)
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

        const crepe = this.getCrepe()
        if (!crepe) {
            this.techCardRoot.textContent = 'Позиция не найдена — возможно, её удалили из меню'
            return
        }
        const techCard = new TechCardComponent(this.techCardRoot)
        techCard.render(crepe)
    }
}

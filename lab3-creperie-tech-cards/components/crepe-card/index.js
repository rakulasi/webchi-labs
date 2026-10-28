import {getCost, getFoodCost, getMarkup} from "../../modules/calc.js";
import {foodCostLimit} from "../../modules/consts.js";

export class CrepeCardComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(crepe) {
        const cost = getCost(crepe)
        const foodCost = getFoodCost(crepe)
        const markup = getMarkup(crepe)
        const isHigh = foodCost > foodCostLimit

        return (
            `
                <div class="card crepe-card ${isHigh ? 'border-danger' : ''}">
                    <div class="crepe-card__top">
                        <span class="badge text-bg-secondary">${crepe.category}</span>
                        <span class="badge ${isHigh ? 'text-bg-danger' : 'text-bg-success'}">Фудкост ${foodCost.toFixed(1)}%</span>
                    </div>
                    <div class="crepe-photo">
                        <img src="${crepe.photo}" alt="${crepe.title}">
                    </div>
                    <div class="crepe-card__code">[${crepe.code}]</div>
                    <h5 class="card-title">${crepe.title}</h5>
                    <div class="spec-grid">
                        <div><span>Цена</span><b>${crepe.crepePrice} ₽</b></div>
                        <div><span>Себестоимость</span><b>${Math.round(cost)} ₽</b></div>
                        <div><span>Наценка</span><b>${Math.round(markup)}%</b></div>
                        <div><span>Ингредиентов</span><b>${crepe.ingredients.length}</b></div>
                    </div>
                    <div class="crepe-card__actions">
                        <button class="btn btn-light crepe-card__link" id="open-crepe-${crepe.id}" data-crepe-id="${crepe.id}" type="button">Техкарта</button>
                        <button class="btn btn-outline-danger" id="delete-crepe-${crepe.id}" data-crepe-id="${crepe.id}" type="button">Удалить</button>
                    </div>
                </div>
            `
        )
    }

    addListeners(crepe, openListener, deleteListener) {
        document
            .getElementById(`open-crepe-${crepe.id}`)
            .addEventListener('click', openListener)
        document
            .getElementById(`delete-crepe-${crepe.id}`)
            .addEventListener('click', deleteListener)
    }

    render(crepe, openListener, deleteListener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(crepe))
        this.addListeners(crepe, openListener, deleteListener)
    }
}

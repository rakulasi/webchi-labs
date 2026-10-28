import {getGross, getCost, getFoodCost, getMarkup} from "../../modules/calc.js";
import {foodCostLimit} from "../../modules/consts.js";

export class TechCardComponent {
    constructor(parent) {
        this.parent = parent
    }

    getIngredientRowsHTML(crepe) {
        let ingredientRows = ''
        crepe.ingredients.forEach((ingredient) => {
            const gross = getGross(ingredient)
            const sum = gross / 1000 * ingredient.pricePerKg
            ingredientRows += `
                <tr>
                    <td>${ingredient.name}</td>
                    <td class="num">${ingredient.net}</td>
                    <td class="num">${ingredient.loss}</td>
                    <td class="num">${Math.round(gross)}</td>
                    <td class="num">${ingredient.pricePerKg} ₽/${ingredient.unit}</td>
                    <td class="num">${sum.toFixed(2)}</td>
                </tr>
            `
        })
        return ingredientRows
    }

    getHTML(crepe) {
        const cost = getCost(crepe)
        const foodCost = getFoodCost(crepe)
        const markup = getMarkup(crepe)
        const isHigh = foodCost > foodCostLimit

        return (
            `
                <div class="card tc-hero">
                    <div class="crepe-photo crepe-photo--hero">
                        <img src="${crepe.photo}" alt="${crepe.title}">
                    </div>
                    <div class="tc-hero__info">
                        <div class="tc-label">${crepe.code} · ${crepe.category}</div>
                        <h1 class="page-title">${crepe.title}</h1>
                        <div class="spec-list">
                            <div><span>Цена продажи</span><b>${crepe.crepePrice} ₽</b></div>
                            <div><span>Себестоимость</span><b>${cost.toFixed(2)} ₽</b></div>
                            <div><span>Фудкост</span><b class="${isHigh ? 'text-danger' : ''}">${foodCost.toFixed(1)}%</b></div>
                            <div><span>Наценка</span><b>${Math.round(markup)}%</b></div>
                        </div>
                        ${isHigh ? `<div class="alert alert-danger mb-0">Фудкост выше порога ${foodCostLimit}%: пересмотрите граммовки или цену.</div>` : ''}
                    </div>
                </div>
                <div class="accordion">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#tc-composition">Состав и граммовки</button>
                        </h2>
                        <div id="tc-composition" class="accordion-collapse collapse show">
                            <div class="accordion-body">
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Ингредиент</th>
                                                <th class="num">Нетто, г</th>
                                                <th class="num">Потери, %</th>
                                                <th class="num">Брутто, г</th>
                                                <th class="num">Цена</th>
                                                <th class="num">Стоимость, ₽</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${this.getIngredientRowsHTML(crepe)}
                                            <tr>
                                                <td colspan="5">Упаковка: ${crepe.packaging.name}</td>
                                                <td class="num">${crepe.packaging.cost.toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th colspan="5">Себестоимость порции</th>
                                                <th class="num">${cost.toFixed(2)}</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#tc-formulas">Как считается</button>
                        </h2>
                        <div id="tc-formulas" class="accordion-collapse collapse">
                            <div class="accordion-body">
                                <div class="spec-list">
                                    <div><span>Брутто</span><b>нетто ÷ (1 − потери)</b></div>
                                    <div><span>Себестоимость</span><b>Σ брутто × цена + упаковка</b></div>
                                    <div><span>Фудкост</span><b>себестоимость ÷ цена × 100</b></div>
                                    <div><span>Наценка</span><b>(цена − себестоимость) ÷ себестоимость × 100</b></div>
                                    <div><span>Порог фудкоста</span><b>${foodCostLimit}%</b></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        )
    }

    render(crepe) {
        const html = this.getHTML(crepe)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}
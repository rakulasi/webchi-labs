import {escapeHTML} from "../../modules/escape.js";

const crepeCategories = ['Галеты', 'Сладкие крепы', 'Напитки']
const ingredientUnits = ['кг', 'л']

export class CrepeFormComponent {
    constructor(parent) {
        this.parent = parent
    }

    getCategoryOptionsHTML(currentCategory) {
        const categories = currentCategory && !crepeCategories.includes(currentCategory)
            ? [...crepeCategories, currentCategory]
            : crepeCategories
        return categories.map((category) => {
            const selected = category === currentCategory ? 'selected' : ''
            return `<option value="${escapeHTML(category)}" ${selected}>${escapeHTML(category)}</option>`
        }).join('')
    }

    getUnitOptionsHTML(currentUnit) {
        return ingredientUnits.map((unit) => {
            const selected = unit === currentUnit ? 'selected' : ''
            return `<option value="${unit}" ${selected}>${unit}</option>`
        }).join('')
    }

    getIngredientRowHTML(ingredient) {
        return (
            `
                <tr class="ingredient-row">
                    <td><input class="form-control" name="ingredientName" type="text" value="${escapeHTML(ingredient.name)}" placeholder="Ингредиент"></td>
                    <td><input class="form-control" name="ingredientNet" type="number" min="0" step="1" value="${escapeHTML(ingredient.net)}"></td>
                    <td><input class="form-control" name="ingredientLoss" type="number" min="0" max="99" step="1" value="${escapeHTML(ingredient.loss)}"></td>
                    <td><input class="form-control" name="ingredientPrice" type="number" min="0" step="1" value="${escapeHTML(ingredient.pricePerKg)}"></td>
                    <td><select class="form-select" name="ingredientUnit">${this.getUnitOptionsHTML(ingredient.unit)}</select></td>
                </tr>
            `
        )
    }

    getHTML(crepe) {
        const ingredientRows = crepe.ingredients.map((ingredient) => this.getIngredientRowHTML(ingredient)).join('')
        return (
            `
                <form id="crepe-form" class="card crepe-form" novalidate>
                    <div class="crepe-form__grid">
                        <label class="crepe-form__field">
                            <span>Номер техкарты</span>
                            <input class="form-control" name="code" type="text" value="${escapeHTML(crepe.code)}" placeholder="ТК-040">
                        </label>
                        <label class="crepe-form__field crepe-form__field--wide">
                            <span>Название позиции</span>
                            <input class="form-control" name="title" type="text" value="${escapeHTML(crepe.title)}" placeholder="Креп с карамелью">
                        </label>
                        <label class="crepe-form__field">
                            <span>Категория</span>
                            <select class="form-select" name="category">${this.getCategoryOptionsHTML(crepe.category)}</select>
                        </label>
                        <label class="crepe-form__field">
                            <span>Цена продажи, ₽</span>
                            <input class="form-control" name="crepePrice" type="number" min="1" step="10" value="${escapeHTML(crepe.crepePrice || '')}">
                        </label>
                        <label class="crepe-form__field crepe-form__field--wide">
                            <span>Фото (путь)</span>
                            <input class="form-control" name="photo" type="text" value="${escapeHTML(crepe.photo)}" placeholder="assets/crepes/sugar.jpg">
                        </label>
                        <label class="crepe-form__field crepe-form__field--wide">
                            <span>Упаковка</span>
                            <input class="form-control" name="packagingName" type="text" value="${escapeHTML(crepe.packaging.name)}" placeholder="Крафт-уголок">
                        </label>
                        <label class="crepe-form__field">
                            <span>Стоимость упаковки, ₽</span>
                            <input class="form-control" name="packagingCost" type="number" min="0" step="1" value="${escapeHTML(crepe.packaging.cost)}">
                        </label>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-sm crepe-form__ingredients">
                            <thead>
                                <tr>
                                    <th>Ингредиент</th>
                                    <th>Нетто, г</th>
                                    <th>Потери, %</th>
                                    <th>Цена за кг/л, ₽</th>
                                    <th>Ед.</th>
                                </tr>
                            </thead>
                            <tbody id="ingredient-rows">${ingredientRows}</tbody>
                        </table>
                    </div>
                    <button id="add-ingredient-button" class="btn btn-outline-dark" type="button">+ Ингредиент</button>
                </form>
            `
        )
    }

    addListeners() {
        document.getElementById('crepe-form').addEventListener('submit', (e) => e.preventDefault())
        document.getElementById('add-ingredient-button').addEventListener('click', () => {
            const emptyIngredient = {name: '', net: '', loss: 0, pricePerKg: '', unit: 'кг'}
            document.getElementById('ingredient-rows').insertAdjacentHTML('beforeend', this.getIngredientRowHTML(emptyIngredient))
        })
    }

    render(crepe) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(crepe))
        this.addListeners()
    }
}

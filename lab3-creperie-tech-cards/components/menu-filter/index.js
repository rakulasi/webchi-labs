import {foodCostLimit} from "../../modules/consts.js";

export class MenuFilterComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML() {
        return (
            `
                <div class="menu-filter">
                    <input id="crepe-title-filter" class="form-control menu-filter__input" type="text" placeholder="Название позиции">
                    <div class="form-check">
                        <input id="crepe-foodcost-filter" class="form-check-input" type="checkbox">
                        <label class="form-check-label" for="crepe-foodcost-filter">Только фудкост выше ${foodCostLimit}%</label>
                    </div>
                </div>
            `
        )
    }

    addListeners(listener) {
        const titleInput = document.getElementById('crepe-title-filter')
        const foodCostInput = document.getElementById('crepe-foodcost-filter')
        const notify = () => {
            listener({title: titleInput.value, onlyHighFoodCost: foodCostInput.checked})
        }
        titleInput.addEventListener('input', notify)
        foodCostInput.addEventListener('change', notify)
    }

    render(listener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())
        this.addListeners(listener)
    }
}

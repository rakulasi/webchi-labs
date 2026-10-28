export class HeaderComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML() {
        return (
            `
                <header class="app-header">
                    <div class="app-header__side">Креперия</div>
                    <div class="app-header__logo">BILIG (OS)</div>
                    <div class="app-header__actions">
                        <button id="home-button" class="btn btn-dark" type="button">Домой</button>
                    </div>
                </header>
            `
        )
    }

    addListeners(listener) {
        document
            .getElementById('home-button')
            .addEventListener('click', listener)
    }

    render(listener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())
        this.addListeners(listener)
    }
}

import {MenuPage} from "./pages/menu/index.js";

const root = document.getElementById('root');

const menuPage = new MenuPage(root);
menuPage.render();

window.addEventListener('scroll', () => {
    document.body.style.backgroundPosition = `0 ${-window.scrollY * 0.4}px`
})

import {KitchenChatsPage} from "./pages/kitchen-chats/index.js";

const root = document.getElementById('root');

const kitchenChatsPage = new KitchenChatsPage(root);
kitchenChatsPage.render();

window.addEventListener('scroll', () => {
    document.body.style.backgroundPosition = `0 ${-window.scrollY * 0.4}px`
})

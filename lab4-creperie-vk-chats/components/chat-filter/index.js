export class ChatFilterComponent {
    constructor(parent) {
        this.parent = parent
        this.chatFilters = [
            {value: 'all', label: 'Все'},
            {value: 'unread', label: 'Непрочитанные'},
            {value: 'important', label: 'Важные'},
            {value: 'unanswered', label: 'Без ответа'}
        ]
    }

    getHTML(activeFilter) {
        const buttons = this.chatFilters.map((chatFilter) => {
            const style = chatFilter.value === activeFilter ? 'btn-dark' : 'btn-outline-dark'
            return `<button class="btn ${style}" type="button" data-chat-filter="${chatFilter.value}">${chatFilter.label}</button>`
        })
        return `<div class="chat-filter-group">${buttons.join('')}</div>`
    }

    render(activeFilter, listener) {
        this.parent.innerHTML = this.getHTML(activeFilter)
        this.parent.querySelectorAll('button').forEach((button) => {
            button.addEventListener('click', () => listener(button.dataset.chatFilter))
        })
    }
}

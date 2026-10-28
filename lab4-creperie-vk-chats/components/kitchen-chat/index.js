export class KitchenChatComponent {
    constructor(parent) {
        this.parent = parent
    }

    createRow(label, value) {
        const row = document.createElement('div')
        const span = document.createElement('span')
        span.textContent = label
        const b = document.createElement('b')
        b.textContent = value
        row.append(span, b)
        return row
    }

    render(kitchenChat) {
        const hero = document.createElement('div')
        hero.className = 'card tc-hero'

        const photo = document.createElement('div')
        photo.className = 'kitchen-chat-photo kitchen-chat-photo--hero'
        if (kitchenChat.photo) {
            const img = document.createElement('img')
            img.src = kitchenChat.photo
            img.alt = kitchenChat.title
            photo.append(img)
        }

        const info = document.createElement('div')
        info.className = 'tc-hero__info'

        const label = document.createElement('div')
        label.className = 'tc-label'
        label.textContent = `${kitchenChat.kind} · peer_id ${kitchenChat.peerId}`

        const title = document.createElement('h1')
        title.className = 'page-title'
        title.textContent = kitchenChat.title

        const list = document.createElement('div')
        list.className = 'spec-list'
        list.append(
            this.createRow('Участники', kitchenChat.members === null ? '—' : kitchenChat.members),
            this.createRow('Непрочитано', kitchenChat.unread),
            this.createRow('Без ответа', kitchenChat.unanswered ? 'Да' : 'Нет'),
            this.createRow('Важный', kitchenChat.important ? 'Да' : 'Нет')
        )
        if (kitchenChat.lastMessage) {
            list.append(this.createRow('Последнее сообщение', kitchenChat.lastMessage))
        }
        if (kitchenChat.date) {
            list.append(this.createRow('Последняя активность', kitchenChat.date))
        }

        info.append(label, title, list)
        hero.append(photo, info)
        this.parent.append(hero)
    }
}

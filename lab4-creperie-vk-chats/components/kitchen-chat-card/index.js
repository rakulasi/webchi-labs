export class KitchenChatCardComponent {
    constructor(parent) {
        this.parent = parent
    }

    createField(label, value) {
        const field = document.createElement('div')
        const span = document.createElement('span')
        span.textContent = label
        const b = document.createElement('b')
        b.textContent = value
        field.append(span, b)
        return field
    }

    getElement(kitchenChat) {
        const tile = document.createElement('div')
        tile.className = 'card kitchen-chat-card'

        const top = document.createElement('div')
        top.className = 'kitchen-chat-card__top'
        const kind = document.createElement('span')
        kind.textContent = kitchenChat.kind
        const peer = document.createElement('span')
        peer.textContent = `[${kitchenChat.peerId}]`
        top.append(kind, peer)
        tile.append(top)

        if (kitchenChat.photo) {
            const photo = document.createElement('div')
            photo.className = 'chat-photo'
            const img = document.createElement('img')
            img.src = kitchenChat.photo
            img.alt = kitchenChat.title
            photo.append(img)
            tile.append(photo)
        }

        const title = document.createElement('h5')
        title.className = 'card-title'
        title.textContent = kitchenChat.title

        const lastMessage = document.createElement('p')
        lastMessage.className = 'kitchen-chat-card__message'
        lastMessage.textContent = kitchenChat.lastMessage

        const specs = document.createElement('div')
        specs.className = 'spec-grid'
        specs.append(
            this.createField('Участники', kitchenChat.members === null ? '—' : kitchenChat.members),
            this.createField('Непрочитано', kitchenChat.unread),
            this.createField('Дата', kitchenChat.date),
            this.createField('Ответ', kitchenChat.unanswered ? 'Нужен' : '—')
        )

        const button = document.createElement('button')
        button.className = 'btn btn-light kitchen-chat-card__link'
        button.type = 'button'
        button.dataset.peerId = kitchenChat.peerId
        button.textContent = 'Открыть'

        tile.append(title, lastMessage, specs, button)
        return tile
    }

    render(kitchenChat, listener) {
        const tile = this.getElement(kitchenChat)
        tile.querySelector('button').addEventListener('click', listener)
        this.parent.append(tile)
    }
}

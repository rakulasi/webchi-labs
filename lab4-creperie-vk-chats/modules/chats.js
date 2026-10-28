export function normalizeConversation(conversation, message, profiles) {
    const isChat = conversation.peer.type === 'chat'

    let title
    let photo = ''
    let members = null

    if (isChat) {
        title = conversation.chat_settings.title
        members = conversation.chat_settings.members_count
        if (conversation.chat_settings.photo) {
            photo = conversation.chat_settings.photo.photo_100
        }
    } else {
        const profile = profiles.find((vkProfile) => vkProfile.id === conversation.peer.id)
        if (profile && profile.deactivated) {
            title = profile.deactivated === 'deleted' ? 'Удалённый пользователь' : 'Заблокированный пользователь'
        } else if (profile) {
            title = `${profile.first_name} ${profile.last_name}`
            photo = profile.photo_100
        } else {
            title = `Диалог ${conversation.peer.id}`
        }
    }

    let lastMessage = ''
    let date = conversation.timestamp ? new Date(conversation.timestamp * 1000).toLocaleString('ru-RU') : ''
    if (message) {
        lastMessage = message.text
        if (!lastMessage) {
            if (message.action && message.action.type === 'chat_create') {
                lastMessage = 'Чат создан'
            } else if (message.action) {
                lastMessage = 'Служебное сообщение'
            } else {
                lastMessage = 'Вложение'
            }
        }
        date = new Date(message.date * 1000).toLocaleString('ru-RU')
    }

    return {
        peerId: conversation.peer.id,
        title: title,
        photo: photo,
        members: members,
        kind: isChat ? 'Чат' : 'Диалог',
        lastMessage: lastMessage,
        date: date,
        unread: conversation.unread_count || 0,
        unanswered: Boolean(conversation.unanswered),
        important: Boolean(conversation.important)
    }
}

export function normalizeConversations(response) {
    const profiles = response.profiles || []
    return response.items.map((vkEntry) => normalizeConversation(vkEntry.conversation, vkEntry.last_message, profiles))
}

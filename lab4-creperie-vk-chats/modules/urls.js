import {accessToken, version} from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method'
    }

    getConversations(filter) {
        const params = new URLSearchParams({
            filter: filter,
            extended: 1,
            count: 50,
            access_token: accessToken,
            v: version
        })
        return `${this.url}/messages.getConversations?${params}`
    }

    getConversationById(peerId) {
        const params = new URLSearchParams({
            peer_ids: peerId,
            extended: 1,
            access_token: accessToken,
            v: version
        })
        return `${this.url}/messages.getConversationsById?${params}`
    }
}

export const urls = new Urls()
class CrepeUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000'
    }

    getCrepes(title) {
        const params = new URLSearchParams()
        if (title) {
            params.set('title', title)
        }
        const query = params.toString()
        return query ? `${this.baseUrl}/crepes?${query}` : `${this.baseUrl}/crepes`
    }

    getCrepeById(crepeId) {
        return `${this.baseUrl}/crepes/${crepeId}`
    }

    createCrepe() {
        return `${this.baseUrl}/crepes`
    }

    updateCrepeById(crepeId) {
        return `${this.baseUrl}/crepes/${crepeId}`
    }

    removeCrepeById(crepeId) {
        return `${this.baseUrl}/crepes/${crepeId}`
    }
}

export const crepeUrls = new CrepeUrls()

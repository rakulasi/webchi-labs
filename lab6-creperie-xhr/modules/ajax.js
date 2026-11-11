class Ajax {
    get(url, onSuccess, onError) {
        this.request('GET', url, null, onSuccess, onError)
    }

    post(url, crepeData, onSuccess, onError) {
        this.request('POST', url, crepeData, onSuccess, onError)
    }

    patch(url, crepeData, onSuccess, onError) {
        this.request('PATCH', url, crepeData, onSuccess, onError)
    }

    delete(url, onSuccess, onError) {
        this.request('DELETE', url, null, onSuccess, onError)
    }

    request(method, url, crepeData, onSuccess, onError) {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return
            }
            if (xhr.status === 0) {
                onError('Сервер недоступен или запрос заблокирован политикой CORS (статус 0)')
                return
            }
            let answer = null
            if (xhr.responseText) {
                try {
                    answer = JSON.parse(xhr.responseText)
                } catch (e) {
                    onError(`Ответ сервера не удалось разобрать (статус ${xhr.status})`)
                    return
                }
            }
            if (xhr.status < 200 || xhr.status >= 300) {
                const reason = answer && answer.error ? answer.error : 'ошибка запроса'
                onError(`${reason} (статус ${xhr.status})`)
                return
            }
            onSuccess(answer)
        }

        if (crepeData !== null) {
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(JSON.stringify(crepeData))
        } else {
            xhr.send()
        }
    }
}

export const ajax = new Ajax()

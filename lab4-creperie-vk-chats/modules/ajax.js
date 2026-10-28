class Ajax {
    post(url, onSuccess, onError) {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', url)

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return
            }
            if (xhr.status !== 200) {
                onError(`Ошибка сети, статус ${xhr.status}`)
                return
            }
            let data
            try {
                data = JSON.parse(xhr.responseText)
            } catch (e) {
                onError('Ответ не удалось разобрать')
                return
            }
            if (data.error) {
                onError(`VK ${data.error.error_code}: ${data.error.error_msg}`)
                return
            }
            onSuccess(data.response)
        }

        xhr.send()
    }
}

export const ajax = new Ajax();
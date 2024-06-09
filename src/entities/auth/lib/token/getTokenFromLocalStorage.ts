/**
 * Получает токен из хранилища, если он там есть, и не просрочен.
 * Принимает параметры:
 * key - ключ, под которым хранятся данные в хранилище.
 */
export const getTokenFromLocalStorage = <T>(key: string): T | null => {
    const dataStr = localStorage.getItem(key)

    if (dataStr === null) {
        return null
    }

    const data = JSON.parse(dataStr)

    const actualTime = new Date().getTime()

    if (actualTime > data.expiry) {
        return null
    }

    return data.data
}

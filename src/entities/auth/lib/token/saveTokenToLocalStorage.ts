/**
 * Сохраняет токен в хранилище.
 * Принимает параметры:
 * key - ключ, под которым хранятся данные в хранилище.
 * data - данные, которые помещаем в хранилище.
 * duration - длительность (мс), которое будет храниться токен.
 */
export const saveTokenToLocalStorage = <T>(key: string, data: T, duration: number): void => {
    /** Узнает текущее время. */
    const time = new Date().getTime()

    /** Создает объект с токеном и временем истечения. */
    const item = {
        data,
        expiry: time + duration
    }

    /** Помещает объект с данными в хранилище. */
    localStorage.setItem(key, JSON.stringify(item))
}

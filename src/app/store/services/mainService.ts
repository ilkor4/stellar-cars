import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from 'app/store/lib/utils/constants'
import { getTokenFromLocalStorage } from 'entities/auth/lib/token/getTokenFromLocalStorage'

/** Сервис - главное апи приложения. */
export const mainApi = createApi({
    reducerPath: 'mainApi',
    /** Описывает теги, под которыми пришедшие с сервера данные будут лежать в кеше. */
    tagTypes: ['Auth', 'User', 'Dictionary', 'Proposals'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        /** Подготавливает заголовки перед запросом. */
        prepareHeaders: (headers) => {
            /** Достает токен из local storage. */
            const token = getTokenFromLocalStorage<string>('access_token')
            /**
             * Проверяет - если токена нет, то записывает адрес в url,
             * перезагружает страницу и перенаправляет на страницу входа.
             * В будущем здесь будет логика обновления токена.
             */
            if (token === null) {
                /** Сохраняем путь */
                const currentPath = location.pathname

                /** Перенаправляем пользователя на страницу авторизации с сохраненным путем */
                location.href = `http://localhost:3000/sign-in?location=${encodeURIComponent(currentPath)}`
            }
            /** Добавляет заголовок авторизации. */
            headers.set('Authorization', `Bearer ${token}`)

            /** Возвращает заголовки. */
            return headers
        },
        /** Обрабатывает успешный ответ запроса. */
        responseHandler: async (response) => {
            /**
             * Проверяет, если Content-Type равен тексту, то возвращает текст.
             * Если Content-Type равен json, то возвращает формат json.
             * В ином случае возвращает ответ запроса.
             */
            if ((response.headers.get('Content-Type')?.includes('text/html')) === true) {
                return await response.text()
            } else if ((response.headers.get('Content-Type')?.includes('application/json')) === true) {
                return await response.json()
            } else {
                return response
            }
        }
    }),
    endpoints: () => ({})
})

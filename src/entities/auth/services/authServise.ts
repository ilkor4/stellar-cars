import { saveTokenToLocalStorage } from 'entities/auth/lib/token/saveTokenToLocalStorage'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from 'app/store/lib/utils/constants'
import { LoginDto, TokenType } from '../model/types'

/** Апи для получения информации по авторизации */
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL
    }),
    endpoints: (build) => ({
        /** Отправляет данные пользователя для авторизации */
        auth: build.query<string, LoginDto>({
            query: (loginDto) => ({
                url: '/internship/v1/auth',
                method: 'POST',
                body: loginDto
            }),
            /** Трансформирует успешный ответ от сервера */
            transformResponse: (response: TokenType): string => {
                const { access_token: token } = response

                /** Сохраняет токен в хранилище */
                saveTokenToLocalStorage('access_token', token, 600000)

                return 'Авторизация прошла успешно!'
            },
            /** Трансформирует неуспешный ответ от сервера */
            transformErrorResponse: (
                response: { status: string | number }
            ) => response.status
        })
    })
})

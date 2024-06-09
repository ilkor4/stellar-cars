import { UserDto } from '../model/types'
import { mainApi } from 'app/store/services/mainService'

/** Эндпоинты для получения данных о пользователе. */
const userApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        /** Получает данные о пользователе. */
        getUser: build.query<UserDto, null>({
            query: () => ({
                url: '/internship/v1/user'
            }),
            /** Указывает в каком теге хранить данные. */
            providesTags: () => [{
                type: 'User'
            }],
            /** Трансформирует неуспешный ответ от сервера. */
            transformErrorResponse: (
                response: { status: string | number }
            ) => response.status
        })
    }),
    overrideExisting: false
})

export const { useGetUserQuery, useLazyGetUserQuery } = userApi

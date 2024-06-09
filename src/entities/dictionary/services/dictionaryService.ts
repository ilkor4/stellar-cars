import { mainApi } from 'app/store/services/mainService'
import { DictCodeType, DictionaryDto } from '../model/types'

/** Эндпоинты для получения данных словарей. */
const dictionaryApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        /** Получает словарь */
        getDictionary: build.query<DictionaryDto[], DictCodeType>({
            query: (dictCode: DictCodeType) => ({
                url: `/internship/v1/dictionary/${dictCode}`
            }),
            /** Указывает в каком теге хранить данные. */
            providesTags: () => [{
                type: 'Dictionary'
            }],
            /** Трансформирует неуспешный ответ от сервера. */
            transformErrorResponse: (
                response: { status: string | number }
            ) => response.status
        })
    }),
    overrideExisting: false
})

export const { useLazyGetDictionaryQuery } = dictionaryApi

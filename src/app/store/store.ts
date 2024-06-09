import { combineReducers, configureStore, EnhancedStore } from '@reduxjs/toolkit'
import authReducer from 'entities/auth/model/authSlice'
import themeReducer from 'features/theme/model/themeSlice'
import proposalsReducer from 'entities/proposals/model/proposalsSlice'
import dictionaryReducer from 'entities/dictionary/model/dictioanarySlice'
import { mainApi } from 'app/store/services/mainService'
import { authApi } from 'entities/auth/services/authServise'

/**
 * Создает корневой редюсер, который состоит из:
 * редюсера авторизации, редюсера темы, редюсера заявок
 * редюсера словарей, редюсера главного апи и редюсера апи авторизации.
 */
const rootReducer = combineReducers({
    authReducer,
    themeReducer,
    proposalsReducer,
    dictionaryReducer,
    [mainApi.reducerPath]: mainApi.reducer,
    [authApi.reducerPath]: authApi.reducer
})

/**
 * Функция создания хранилища, в конфигурацию которой входят:
 * корневой редюсер и обработчики.
 */
export const setupStore = (): EnhancedStore => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return (
                getDefaultMiddleware({
                    serializableCheck: false
                })
                    .concat(
                        mainApi.middleware,
                        authApi.middleware
                    )
            )
        }
    })
}

/** Тип корневого состояния. */
export type RootState = ReturnType<typeof rootReducer>
/** Тип хранилища приложения. */
export type AppStore = ReturnType<typeof setupStore>
/** Тип диспетчера приложения. */
export type AppDispatch = AppStore['dispatch']

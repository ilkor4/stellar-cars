import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthStateType } from './types'

const initialState: AuthStateType = {
    /** Авторизован ли пользователь. */
    isLogged: false,
    /** Существует ли токен. */
    hasToken: false,
    /** Завершилась ли авторизация. */
    isAuthChecked: false
}

/** Слайс, координирующий изменения состояния авторизации. */
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /** Редюсер, изменяющий состояние наличия токена. */
        changeTokenState (state, action: PayloadAction<boolean>): void {
            state.hasToken = action.payload
        },
        /** Редюсер, изменяющий состояние (авторизирован ли пользователь). */
        changeLoggedState (state, action: PayloadAction<boolean>): void {
            state.isLogged = action.payload
        },
        /** Редюсер, изменяющий состояние (завершилась ли авторизация). */
        changeAuthCheckedState (state, action: PayloadAction<boolean>): void {
            state.isAuthChecked = action.payload
        }
    }
})

export default authSlice.reducer

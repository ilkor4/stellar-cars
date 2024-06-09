import { Theme, ThemeStataType } from '../model/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ThemeStataType = {
    /** Тема. */
    theme: Theme.DARK
}

/** Слайс, координирующий изменения состояния темы. */
export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        /** Редюсер, изменяющий состояние темы. */
        changeTheme (state, action: PayloadAction<Theme>): void {
            state.theme = action.payload
        }
    }
})

export default themeSlice.reducer

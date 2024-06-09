import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    AutoCategoriesType,
    CategoryDictionaryType,
    DictionaryCategoryType,
    DictionaryStateType
} from '../model/types'

const initialState: DictionaryStateType = {
    /** Словарь автомобилей. */
    autoDictionary: {},
    /** Объект категорий авто. */
    autoCategories: {},
    /** Словарь категорий авто. */
    autoCategoriesDictionary: {},
    /** Словарь названий категорий авто. */
    autoCategoriesNamesDictionary: {},
    /** Словарь моделей авто. */
    autoModelsDictionary: {},
    /** Словарь городов. */
    citiesDictionary: {},
    /** Словарь статусов. */
    statusesDictionary: {}
}

/** Слайс, координирующий изменения состояния словарей. */
export const dictionarySlice = createSlice({
    name: 'dictionary',
    initialState,
    reducers: {
        /** Редюсер, изменяющий состояние словаря автомобилей. */
        changeAutoDictionaryState (state, action: PayloadAction<CategoryDictionaryType>): void {
            state.autoDictionary = action.payload
        },
        /** Редюсер, изменяющий состояние объекта категорий авто. */
        changeAutoCategoriesState (state, action: PayloadAction<AutoCategoriesType>): void {
            state.autoCategories = action.payload
        },
        /** Редюсер, изменяющий состояние словаря категорий авто. */
        changeAutoCategoriesDictionaryState (state, action: PayloadAction<DictionaryCategoryType>): void {
            state.autoCategoriesDictionary = action.payload
        },
        /** Редюсер, изменяющий состояние словаря названий категорий авто. */
        changeAutoCategoriesNamesDictionaryState (
            state,
            action: PayloadAction<DictionaryCategoryType>
        ): void {
            state.autoCategoriesNamesDictionary = action.payload
        },
        /** Редюсер, изменяющий состояние словаря моделей авто. */
        changeAutoModelsDictionaryState (state, action: PayloadAction<DictionaryCategoryType>): void {
            state.autoModelsDictionary = action.payload
        },
        /** Редюсер, изменяющий состояние словаря городов. */
        changeCitiesDictionaryState (state, action: PayloadAction<DictionaryCategoryType>): void {
            state.citiesDictionary = action.payload
        },
        /** Редюсер, изменяющий состояние словаря статусов. */
        changeStatusesDictionaryState (state, action: PayloadAction<DictionaryCategoryType>): void {
            state.statusesDictionary = action.payload
        }
    }
})

export default dictionarySlice.reducer

import { DictionaryCategoryType, DictionaryDto } from 'entities/dictionary/model/types'

/**
 * Разбивает словарь на категории.
 * Принимает параметры:
 * dictionariesArr - словарь с данными.
 * Возвращает словарь, разбитый на категории
 */
export const categorizeDictionary = (dictionariesArr: DictionaryDto[]): DictionaryCategoryType => {
    /** Создает исходное значение. */
    const initialValue: DictionaryCategoryType = {}

    /** Возвращает словарь, разбитый на категории. */
    return dictionariesArr
        ?.reduce((arr, { name, code }) => {
            initialValue[code] = name

            return arr
        }, initialValue)
}

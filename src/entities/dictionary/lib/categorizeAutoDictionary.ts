import {
    AutoCategoriesType,
    CategoryDictionaryType, DictionaryCategoryType,
    DictionaryDto
} from 'entities/dictionary/model/types'

/**
 * Разбивает словарь автомобилей на категории.
 * Принимает параметры:
 * autoData - словарь автомобилей.
 * categoryData - словарь категорий автомобилей.
 */
export const categorizeAutoDictionary =
    (autoData: DictionaryDto[], categoryData: DictionaryDto[]):
    [CategoryDictionaryType, AutoCategoriesType, DictionaryCategoryType, DictionaryCategoryType] => {
        /** Начальное значение словаря автомобилей разбитого по категориям.  */
        const initialValue: CategoryDictionaryType = {}
        /** Объект категорий автомобилей. */
        const autoCategories: AutoCategoriesType = {}
        /** Словарь категорий автомобилей. */
        const autoCategoriesDictionary: DictionaryCategoryType = {}
        /** Объект названий категорий автомобилей. */
        const autoCategoriesNamesDictionary: DictionaryCategoryType = {}

        /** Проходит циклом по каждому автомобилю из словаря. */
        categoryData?.forEach(({ id, name, code }) => {
            initialValue[id] = []
            autoCategories[id] = name
            autoCategoriesDictionary[code] = name
            autoCategoriesNamesDictionary[code] = id.toString()
        })

        /** Создает словарь автомобилей, разбитый по категориям. */
        const autoDictionary = autoData
            .reduce((obj: CategoryDictionaryType, {
                id,
                name,
                categoryId,
                code,
                dictCode
            }) => {
                if (obj[categoryId] !== undefined) {
                    obj[categoryId].push({
                        id,
                        name,
                        categoryId,
                        code,
                        dictCode
                    })
                } else {
                    obj[categoryId] = []
                }
                return obj
            }, initialValue)

        return [
            autoDictionary,
            autoCategories,
            autoCategoriesDictionary,
            autoCategoriesNamesDictionary
        ]
    }

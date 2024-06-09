/** Тип категории. */
export type CategoryType = Omit<DictionaryDto, | 'createdAt' | 'updatedAt'>
/** Тип словаря, разбитого по категориям. */
export type CategoryDictionaryType = Record<string, CategoryType[]>
/** Тип словаря автомобильных категорий. */
export type AutoCategoriesType = Record<number, string>
/** Тип словаря категорий. */
export type DictionaryCategoryType = Record<string, string>

/** Тип состояния словарей. */
export interface DictionaryStateType {
    autoDictionary: CategoryDictionaryType
    autoCategories: AutoCategoriesType
    autoCategoriesDictionary: DictionaryCategoryType
    autoCategoriesNamesDictionary: DictionaryCategoryType
    autoModelsDictionary: DictionaryCategoryType
    citiesDictionary: DictionaryCategoryType
    statusesDictionary: DictionaryCategoryType
}

/** Перечисление кодов значений словаря. */
export enum DictCodeType {
    AUTO = 'AUTO',
    CITIES = 'CITIES',
    STATUSES = 'STATUSES',
    AUTO_CATEGORIES = 'AUTO_CATEGORIES'
}

/** Тип объекта передачи данных словаря. */
export interface DictionaryDto {
    id: number
    name: string
    code: string
    dictCode: DictCodeType
    categoryId: number
    createdAt: string
    updatedAt: string
}

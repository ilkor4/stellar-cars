import { DictionaryCategoryType } from 'entities/dictionary/model/types'
import { OptionsDataType } from 'entities/proposals/model/types'

/**
 * Трансформирует словарь к формату options для select.
 * Принимает параметры:
 * obj - словарь.
 */
export const transformToOptions = (obj: DictionaryCategoryType): OptionsDataType[] => {
    const initialValue: OptionsDataType[] = []

    return Object.entries(obj)
        ?.reduce((arr, [value, key]) => {
            arr.push({
                label: key,
                value
            })

            return arr
        }, initialValue)
}

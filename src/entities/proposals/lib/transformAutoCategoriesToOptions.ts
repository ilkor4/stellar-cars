import { CategoryType } from 'entities/dictionary/model/types'
import { OptionsDataType } from 'entities/proposals/model/types'

/**
 * Трансформирует массив моделей авто к формату options для select.
 * Принимает параметры:
 * autoModelsArr - массив моделей авто.
 */
export const transformAutoCategoriesToOptions = (autoModelsArr: CategoryType[]): OptionsDataType[] => {
    return autoModelsArr
        ?.reduce((arr: OptionsDataType[], { name, code }) => {
            arr.push({
                label: name,
                value: code
            })
            return arr
        }, [])
}

import { DictionaryCategoryType } from 'entities/dictionary/model/types'
import { ProposalDto, ProposalsDictionaryType } from 'entities/proposals/model/types'

/**
 * Разбивает данные заявок на категории.
 * Принимает параметры:
 * proposalsData - данные заявок.
 * categoryData - словарь категорий заявок.
 */
export const categorizeProposalsDictionary =
    (proposalsData: ProposalDto[], categoryData: DictionaryCategoryType): ProposalsDictionaryType => {
        /** Создаем исходное значение. */
        const initialValue: ProposalsDictionaryType = {}

        /** Создаем ключи из категорий заявок в исходном значении. */
        Object.keys(categoryData)?.forEach((key) => {
            initialValue[key] = []
        })

        /** Возвращаем словарь заявок, разбитых на категории.  */
        return proposalsData
            ?.reduce((obj: ProposalsDictionaryType, item) => {
                const { status } = item

                if (obj[status.code] !== undefined) {
                    obj[status.code].push(item)
                } else {
                    obj[status.code] = []
                }

                return obj
            }, initialValue)
    }

import { ProposalDto, SortValues } from 'entities/proposals/model/types'

/**
 * Сортирует массив заявок по переданному методу.
 * Принимает параметры:
 * sort - метод сортировки.
 * arr - массив заявок.
 */
export const sorting = (sort: string, arr: ProposalDto[]): ProposalDto[] => {
    const copyArr = [...arr]

    if (arr.length < 2) {
        return copyArr
    }

    /** Проверяет соответствие метода сортировки. */
    switch (sort) {
        /** Кейс сортировки по умолчанию. */
        case SortValues.SORT_BASE:
            return copyArr
        /** Кейс asc сортировки по id. */
        case SortValues.SORT_BY_ID:
            return copyArr
                .sort((a, b) => a.id - b.id)
        /** Кейс desc сортировки по id. */
        case SortValues.SORT_BY_ID_REVERSE:
            return copyArr
                .sort((a, b) => b.id - a.id)
        /** Кейс asc сортировки по имени. */
        case SortValues.SORT_BY_FIRSTNAME:
            return copyArr
                .sort((a, b) => {
                    const aValue = a.person.firstName
                    const bValue = b.person.firstName

                    return aValue.localeCompare(bValue)
                })
        /** Кейс desc сортировки по имени. */
        case SortValues.SORT_BY_FIRSTNAME_REVERSE:
            return copyArr
                .sort((a, b) => {
                    const aValue = a.person.firstName
                    const bValue = b.person.firstName

                    return bValue.localeCompare(aValue)
                })
        /** Кейс asc сортировки по фамилии. */
        case SortValues.SORT_BY_LASTNAME:
            return copyArr
                .sort((a, b) => {
                    const aValue = a.person.lastName
                    const bValue = b.person.lastName

                    return aValue.localeCompare(bValue)
                })
        /** Кейс desc сортировки по фамилии. */
        case SortValues.SORT_BY_LASTNAME_REVERSE:
            return copyArr
                .sort((a, b) => {
                    const aValue = a.person.lastName
                    const bValue = b.person.lastName

                    return bValue.localeCompare(aValue)
                })
        /** Кейс asc сортировки по водительскому удостоверению. */
        case SortValues.SORT_BY_DRIVER_LICENCE:
            return copyArr
                .sort((a, b) => {
                    const aValue = a.person.driverLicense
                    const bValue = b.person.driverLicense

                    return aValue.localeCompare(bValue)
                })
        /** Кейс desc сортировки по водительскому удостоверению. */
        case SortValues.SORT_BY_DRIVER_LICENCE_REVERSE:
            return copyArr
                .sort((a, b) => {
                    const aValue = a.person.driverLicense
                    const bValue = b.person.driverLicense

                    return bValue.localeCompare(aValue)
                })
        /** Кейс asc сортировки по email. */
        case SortValues.SORT_BY_EMAIL:
            return copyArr
                .sort((a, b) => {
                    const aValue = a.person.email
                    const bValue = b.person.email

                    return aValue.localeCompare(bValue)
                })
        /** Кейс desc сортировки по email. */
        case SortValues.SORT_BY_EMAIL_REVERSE:
            return copyArr
                .sort((a, b) => {
                    const aValue = a.person.email
                    const bValue = b.person.email

                    return bValue.localeCompare(aValue)
                })
        /** Кейс asc сортировки по статусу заявки. */
        case SortValues.SORT_BY_STATUS:
            return copyArr
                .sort((a, b) => {
                    const aValue = a.status.code
                    const bValue = b.status.code

                    return aValue.localeCompare(bValue)
                })
        /** Кейс desc сортировки по статусу заявки. */
        case SortValues.SORT_BY_STATUS_REVERSE:
            return copyArr
                .sort((a, b) => {
                    const aValue = a.status.code
                    const bValue = b.status.code

                    return bValue.localeCompare(aValue)
                })
        /** Кейс asc сортировки по городу. */
        case SortValues.SORT_BY_CITY:
            return copyArr
                .sort((a, b) => {
                    const aValue = a.city.code
                    const bValue = b.city.code

                    return aValue.localeCompare(bValue)
                })
        /** Кейс desc сортировки по городу. */
        case SortValues.SORT_BY_CITY_REVERSE:
            return copyArr
                .sort((a, b) => {
                    const aValue = a.city.code
                    const bValue = b.city.code

                    return bValue.localeCompare(aValue)
                })
        /** Кейс asc сортировки по категории авто. */
        case SortValues.SORT_BY_AUTO_CATEGORY:
            return copyArr
                .sort((a, b) => {
                    const aValue = a.auto.model.code
                    const bValue = b.auto.model.code

                    return aValue.localeCompare(bValue)
                })
        /** Кейс desc сортировки по категории авто. */
        case SortValues.SORT_BY_AUTO_CATEGORY_REVERSE:
            return copyArr
                .sort((a, b) => {
                    const aValue = a.auto.model.code
                    const bValue = b.auto.model.code

                    return bValue.localeCompare(aValue)
                })
        /** Кейс asc сортировки по модели авто. */
        case SortValues.SORT_BY_MODEL:
            return copyArr
                .sort((a, b) => {
                    const aValue = a.auto.model.code
                    const bValue = b.auto.model.code

                    return aValue.localeCompare(bValue)
                })
        /** Кейс desc сортировки по модели авто. */
        case SortValues.SORT_BY_MODEL_REVERSE:
            return copyArr
                .sort((a, b) => {
                    const aValue = a.auto.model.code
                    const bValue = b.auto.model.code

                    return bValue.localeCompare(aValue)
                })
        /** Кейс сортировки по дефолту. */
        default:
            return copyArr
    }
}

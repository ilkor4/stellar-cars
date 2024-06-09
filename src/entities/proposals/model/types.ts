/** Тип словаря заявок. */
export type ProposalsDictionaryType = Record<string, ProposalDto[]>
/** Тип запроса на создание/изменение заявки. */
export type ProposalRequestDataType = Omit<ProposalDto, 'id'> & Partial<Pick<ProposalDto, 'id'>>

/** Тип словарных данных из ProposalDto. */
export interface DictionaryType {
    code: string
}

/** Тип данных об автомобиле из ProposalDto. */
export interface AutoType {
    autoCategory: DictionaryType
    model: DictionaryType
}

/** Тип личной информации из ProposalDto. */
export interface PersonType {
    lastName: string
    firstName: string
    driverLicense: string
    email: string
}

/** Тип объекта передачи данных заявок. */
export interface ProposalDto {
    id: number
    status: DictionaryType
    person: PersonType
    auto: AutoType
    city: DictionaryType
}

/** Перечисление видов сортировки. */
export enum Sort {
    BASE = 'SORT_BASE',
    ID = 'SORT_BY_ID',
    FIRSTNAME = 'SORT_BY_FIRSTNAME',
    LASTNAME = 'SORT_BY_LASTNAME',
    DRIVER_LICENCE = 'SORT_BY_DRIVER_LICENCE',
    EMAIL = 'SORT_BY_EMAIL',
    STATUS = 'SORT_BY_STATUS',
    CITY = 'SORT_BY_CITY',
    AUTO_CATEGORY = 'SORT_BY_AUTO_CATEGORY',
    MODEL = 'SORT_BY_MODEL',
    ID_REVERSE = 'SORT_BY_ID_REVERSE',
    FIRSTNAME_REVERSE = 'SORT_BY_FIRSTNAME_REVERSE',
    LASTNAME_REVERSE = 'SORT_BY_LASTNAME_REVERSE',
    DRIVER_LICENCE_REVERSE = 'SORT_BY_DRIVER_LICENCE_REVERSE',
    EMAIL_REVERSE = 'SORT_BY_EMAIL_REVERSE',
    STATUS_REVERSE = 'SORT_BY_STATUS_REVERSE',
    CITY_REVERSE = 'SORT_BY_CITY_REVERSE',
    AUTO_CATEGORY_REVERSE = 'SORT_BY_AUTO_CATEGORY_REVERSE',
    MODEL_REVERSE = 'SORT_BY_MODEL_REVERSE'
}

/** Константы значений видов сортировки. */
export const SortValues: Record<Sort, string> = {
    [Sort.BASE]: 'SORT_BASE',
    [Sort.ID]: 'SORT_BY_ID',
    [Sort.FIRSTNAME]: 'SORT_BY_FIRSTNAME',
    [Sort.LASTNAME]: 'SORT_BY_LASTNAME',
    [Sort.DRIVER_LICENCE]: 'SORT_BY_DRIVER_LICENCE',
    [Sort.EMAIL]: 'SORT_BY_EMAIL',
    [Sort.STATUS]: 'SORT_BY_STATUS',
    [Sort.CITY]: 'SORT_BY_CITY',
    [Sort.AUTO_CATEGORY]: 'SORT_BY_AUTO_CATEGORY',
    [Sort.MODEL]: 'SORT_BY_MODEL',
    [Sort.ID_REVERSE]: 'SORT_BY_ID_REVERSE',
    [Sort.FIRSTNAME_REVERSE]: 'SORT_BY_FIRSTNAME_REVERSE',
    [Sort.LASTNAME_REVERSE]: 'SORT_BY_LASTNAME_REVERSE',
    [Sort.DRIVER_LICENCE_REVERSE]: 'SORT_BY_DRIVER_LICENCE_REVERSE',
    [Sort.EMAIL_REVERSE]: 'SORT_BY_EMAIL_REVERSE',
    [Sort.STATUS_REVERSE]: 'SORT_BY_STATUS_REVERSE',
    [Sort.CITY_REVERSE]: 'SORT_BY_CITY_REVERSE',
    [Sort.AUTO_CATEGORY_REVERSE]: 'SORT_BY_AUTO_CATEGORY_REVERSE',
    [Sort.MODEL_REVERSE]: 'SORT_BY_MODEL_REVERSE'
}

/** Тип состояния заявок. */
export interface ProposalsStateType {
    proposalsDictionary: ProposalsDictionaryType
    allProposals: ProposalDto[]
    filter: string
    sort: Sort
}

/** Тип данных с формы создания/редактирования заявок. */
export interface ProposalsInfoType {
    lastName: string
    firstName: string
    driverLicense: string
    email: string
    autoCategory: OptionsDataType
    model: OptionsDataType
    city: OptionsDataType
}

/** Тип options для select. */
export interface OptionsDataType {
    value: string
    label: string
}

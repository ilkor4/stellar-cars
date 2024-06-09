import { ProposalRequestDataType, ProposalsInfoType } from 'entities/proposals/model/types'

/**
 * Трансформирует данные из формы в формат запроса заявки.
 * Принимает параметры:
 * proposalInfo - данные из формы создания/редактирования заявки.
 */
export const transformToProposalRequestData = (proposalInfo: ProposalsInfoType): ProposalRequestDataType => {
    const {
        firstName,
        lastName,
        driverLicense,
        email,
        model,
        autoCategory,
        city
    } = proposalInfo

    const { value: autoCategoryValue } = autoCategory
    const { value: modelValue } = model
    const { value: cityValue } = city

    return {
        status: {
            code: 'DRAFT'
        },
        person: {
            firstName,
            lastName,
            driverLicense,
            email
        },
        auto: {
            autoCategory: {
                code: autoCategoryValue
            },
            model: {
                code: modelValue
            }
        },
        city: {
            code: cityValue
        }
    }
}

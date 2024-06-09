import { ProposalDto } from 'entities/proposals/model/types'

/**
 * Ищет заявку по id в словаре заявок.
 * Принимает параметры:
 * id - идентификатор заявки.
 * dictionary - словарь заявок.
 */
export const findProposalInDictionary =
    (id: number, dictionary: ProposalDto[]): ProposalDto | undefined => {
        return dictionary
            .find((proposal) => {
                return (proposal.id === +id)
            })
    }

import { RootState } from 'app/store/store'
import { createSelector } from '@reduxjs/toolkit'
import { ProposalDto, ProposalsDictionaryType, Sort } from 'entities/proposals/model/types'
import { sorting } from 'pages/ProposalsPage/lib/utils/filtration/sorting'

/** Достает все заявки из хранилища. */
export const selectAllProposals = (state: RootState): ProposalDto[] => {
    return state.proposalsReducer.allProposals
}

/** Достает словарь заявок из хранилища. */
export const selectProposalsDictionary = (state: RootState): ProposalsDictionaryType => {
    return state.proposalsReducer.proposalsDictionary
}

/** Достает активный фильтр из хранилища. */
export const selectActiveFilter = (state: RootState): string => state.proposalsReducer.filter

/** Достает активный метод сортировки из хранилища. */
export const selectActiveSort = (state: RootState): Sort => state.proposalsReducer.sort

/** Достает отфильтрованный заявки из хранилища. */
export const selectProposalsByFilter = createSelector(
    [selectAllProposals, selectProposalsDictionary, selectActiveFilter, selectActiveSort],
    (allProposals, proposalsDictionary, activeFilter, activeSort) => {
        if (activeFilter === 'ALL') {
            return sorting(activeSort, allProposals)
        }
        /** Сортирует отфильтрованные заявки. */
        return sorting(activeSort, proposalsDictionary[activeFilter] ?? [])
    }
)

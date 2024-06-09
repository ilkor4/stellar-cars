import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    ProposalDto,
    ProposalsDictionaryType,
    ProposalsStateType,
    Sort
} from '../model/types'

const initialState: ProposalsStateType = {
    /** Словарь заявок. */
    proposalsDictionary: {},
    /** Все заявки. */
    allProposals: [],
    /** Фильтр. */
    filter: 'ALL',
    /** Метод сортировки. */
    sort: Sort.ID
}

/** Слайс, координирующий изменения состояния заявок. */
export const proposalsSlice = createSlice(({
    name: 'proposals',
    initialState,
    reducers: {
        /** Редюсер, изменяющий состояние словаря заявок. */
        changeProposalsDictionary (state, action: PayloadAction<ProposalsDictionaryType>): void {
            state.proposalsDictionary = action.payload
        },
        /** Редюсер, изменяющий состояние всех заявок. */
        changeAllProposals (state, action: PayloadAction<ProposalDto[]>): void {
            state.allProposals = action.payload
        },
        /** Редюсер, изменяющий состояние фильтра. */
        changeFilter (state, action: PayloadAction<string>): void {
            state.filter = action.payload
        },
        /** Редюсер, изменяющий состояние метода сортировки. */
        changeSort (state, action: PayloadAction<Sort>): void {
            state.sort = action.payload
        }
    }
}))

export default proposalsSlice.reducer

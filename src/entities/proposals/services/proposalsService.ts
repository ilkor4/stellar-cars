import { ProposalDto, ProposalRequestDataType } from '../model/types'
import { mainApi } from 'app/store/services/mainService'

/** Эндпоинты для работы с заявками. */
const proposalsApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        /** Получает все заявки. */
        getProposals: build.query<ProposalDto[], null>({
            query: () => ({
                url: '/internship/v1/proposals'
            }),
            /** Указывает в каком теге хранить данные. */
            providesTags: () => [{
                type: 'Proposals'
            }],
            /** Трансформирует неуспешный ответ от сервера. */
            transformErrorResponse: (
                response: {
                    status: string | number
                }
            ) => response.status
        }),
        /** Мутация - получает заявку по id. */
        getProposal: build.mutation<ProposalDto, number>({
            query: (id: number) => ({
                url: `/internship/v1/proposal/${id}`
            }),
            /** Указывает какой тег изменить. */
            invalidatesTags: ['Proposals'],
            /** Трансформирует неуспешный ответ от сервера. */
            transformErrorResponse: (
                response: {
                    status: string | number
                }
            ) => response.status
        }),
        /** Мутация - получает статус заявки по id. */
        getProposalStatus: build.query<string, number>({
            query: (id: number) => ({
                url: `/internship/v1/proposal/${id}/status`
            }),
            /** Трансформирует неуспешный ответ от сервера. */
            transformErrorResponse: (
                response: {
                    status: string | number
                }
            ) => response.status
        }),
        /** Мутация - сохраняет заявку в черновик. */
        saveProposal: build.mutation<ProposalDto, ProposalRequestDataType>({
            query: (proposalRequestData: ProposalRequestDataType) => ({
                url: '/internship/v1/proposal',
                method: 'POST',
                body: proposalRequestData
            }),
            /** Указывает какой тег изменить. */
            invalidatesTags: ['Proposals'],
            /** Трансформирует неуспешный ответ от сервера. */
            transformErrorResponse: (
                response: {
                    status: string | number
                }
            ) => response.status
        }),
        /** Мутация - удаляет заявку по id. */
        deleteProposal: build.mutation<null, number>({
            query: (id: number) => ({
                url: `/internship/v1/proposal/${id}`,
                method: 'DELETE'
            }),
            /** Указывает какой тег изменить. */
            invalidatesTags: ['Proposals'],
            /** Трансформирует неуспешный ответ от сервера. */
            transformErrorResponse: (
                response: {
                    status: string | number
                }
            ) => response.status
        }),
        /** Мутация - изменяет заявку по id. */
        changeProposal: build.mutation<ProposalDto, ProposalRequestDataType>({
            query: (proposal: ProposalRequestDataType) => ({
                url: '/internship/v1/proposal',
                method: 'PUT',
                body: proposal
            }),
            /** Указывает какой тег изменить. */
            invalidatesTags: ['Proposals'],
            /** Трансформирует неуспешный ответ от сервера. */
            transformErrorResponse: (
                response: {
                    status: string | number
                }
            ) => response.status
        }),
        /** Мутация - отправляет заявку на рассмотрение. */
        sendProposal: build.mutation<ProposalDto, number>({
            query: (id: number) => ({
                url: `/internship/v1/proposal/${id}/send`
            }),
            /** Указывает какой тег изменить. */
            invalidatesTags: ['Proposals'],
            /** Трансформирует неуспешный ответ от сервера. */
            transformErrorResponse: (
                response: {
                    status: string | number
                }
            ) => response.status
        })
    }),
    overrideExisting: false
})

export const {
    useGetProposalsQuery,
    useGetProposalMutation,
    useLazyGetProposalStatusQuery,
    useLazyGetProposalsQuery,
    useSaveProposalMutation,
    useDeleteProposalMutation,
    useChangeProposalMutation,
    useSendProposalMutation
} = proposalsApi

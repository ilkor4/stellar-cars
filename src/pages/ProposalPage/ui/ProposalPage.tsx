import { JSX, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { RoutePaths } from 'shared/config/routeConfig/routeConfig'
import { useAppSelector } from 'app/store/hooks/redux'
import { ProposalDto } from 'entities/proposals/model/types'
import { ProposalReadonly } from 'entities/proposals/ui'
import { ProposalEdit } from 'entities/proposals/ui/ProposalEdit/ProposalEdit'
import { findProposalInDictionary } from 'entities/proposals/lib/findProposalInDictionary'
import { Modal } from 'shared/ui/Modal/Modal'
import {
    useGetProposalMutation,
    useLazyGetProposalStatusQuery
} from 'entities/proposals/services/proposalsService'
import cls from './ProposalPage.module.scss'

/** Страница заявки. */
export default function ProposalPage (): JSX.Element {
    const navigate = useNavigate()
    const { id } = useParams()
    const { allProposals } = useAppSelector(state => state.proposalsReducer)
    const [proposalData, setProposalData] = useState<ProposalDto | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [getProposal] = useGetProposalMutation()
    /** Функция получения статуса заявки, которая обновляется каждые 5 секунд. */
    const [getProposalStatus, { isError, data: status }] = useLazyGetProposalStatusQuery({
        pollingInterval: 5000,
        skipPollingIfUnfocused: true
    })

    /**
     * Эффект, который исполняется на каждое изменения состояния всех заявок.
     * Если заявки и id есть, то находим информацию о заявке в словаре
     * и помещаем ее в локальное состояние.
     */
    useEffect(() => {
        if (allProposals.length > 0 && id !== undefined) {
            const proposal = findProposalInDictionary(+id, allProposals)

            if (proposal !== undefined) {
                setProposalData(proposal)
            } else {
                navigate(RoutePaths['not-found'], { replace: true })
            }
        }
    }, [allProposals])

    /**
     * Эффект, который исполняется на каждое изменения состояния данных заявки.
     * Если заявка со статусом ожидание, то получаем ее актуальный статус каждые 5 секунд.
     */
    useEffect(() => {
        if (proposalData !== null) {
            const proposalStatus = proposalData.status.code

            if (proposalStatus === 'PENDING') {
                getProposalStatus(proposalData.id)
                    .unwrap()
                    .catch((err) => { console.log(err) })
            }
        }
    }, [proposalData])

    /**
     * Эффект, который исполняется на каждое изменения статуса заявки.
     * Если статус, пришедший с запроса отличается от статуса заявки,
     * то получаем актуальные данные заявки и тем самым обновляем состояние всех заявок.
     */
    useEffect(() => {
        if (proposalData !== null) {
            const proposalStatus = proposalData.status.code

            if (status !== proposalStatus) {
                getProposal(proposalData.id)
                    .unwrap()
                    .catch((err) => { console.log(err) })
                    .finally(() => { setIsModalOpen(false) })
            }
        }
    }, [status])

    /** Открывает модальное окно. */
    const handleOpenModal = (): void => {
        setIsModalOpen(true)
    }

    /** Закрывает модальное окно. */
    const handleCloseModal = (): void => {
        setIsModalOpen(false)
    }

    return (
        <main className={cls.page}>
            {/** Тернарный отображающий страницу, зависящую от статуса заявки. */
                (proposalData?.status?.code === 'DRAFT')
                    ? <ProposalEdit proposal={proposalData} onOpenModalWithLoader={handleOpenModal}/>
                    : (proposalData !== null) && <ProposalReadonly proposal={proposalData}/>
            }
            { /** Оператор отслеживающий состояние ошибки. */
                isError && <p className={cls.page__error}>Во время выполнения запроса произошла ошибка</p>
            }
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                isSuccess={false}
                isError={false}
                isLoading={true}
            >
                <p className={cls.page__success}>Заявка рассматривается</p>
            </Modal>
        </main>
    )
};

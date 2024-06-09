import { JSX, useState } from 'react'
import { ProposalRow, ProposalsTable } from 'entities/proposals/ui'
import { useAppSelector } from 'app/store/hooks/redux'
import { FilterToggle } from 'widgets/FilterToggle'
import { selectProposalsByFilter } from 'pages/ProposalsPage/lib/utils/filtration/selectors'
import EditIcon from 'shared/assets/images/icons/edit.svg'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { RoutePaths } from 'shared/config/routeConfig/routeConfig'
import { Modal } from 'shared/ui/Modal/Modal'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { useDeleteProposalMutation } from 'entities/proposals/services/proposalsService'
import cls from './ProposalsPage.module.scss'

/** Страница заявок. */
export default function ProposalsPage (): JSX.Element {
    const proposals = useAppSelector(selectProposalsByFilter)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [proposalDeleteId, setDeleteIdProposal] = useState<number | null>(null)
    const [deleteProposal, { isLoading, isSuccess, isError }] = useDeleteProposalMutation()

    /** Открывает модальное окно удаления заявки. */
    const handleOpenModal = (id: number): void => {
        setDeleteIdProposal(id)
        setIsModalOpen(true)
    }

    /** Закрывает модальное окно удаления заявки. */
    const handleCloseModal = (): void => {
        setDeleteIdProposal(null)
        setIsModalOpen(false)
    }

    /** Удаляет заявку. */
    const handleDeleteProposal = async (id: number | null): Promise<void> => {
        if (id !== null) {
            try {
                await deleteProposal(id).unwrap()
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <main className={cls.page}>
            <p className={cls.page__title}>Всего заявок: {proposals?.length ?? '0'}</p>
            <AppLink
                to={RoutePaths['new-proposal']}
                theme={AppLinkTheme.PROPOSAL}
            >
                <EditIcon className={cls.page__edit}/>
                Создать новую заявку
            </AppLink>
            <FilterToggle />
            <ProposalsTable>
                {proposals?.map((proposal) => {
                    return <ProposalRow
                        onOpen={handleOpenModal}
                        key={proposal.id}
                        proposal={proposal}
                    />
                })}
            </ProposalsTable>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                isSuccess={isSuccess}
                isError={isError}
                isLoading={isLoading}
            >
                <p className={cls.page__info}>
                    Вы точно уверены, что хотите удалить
                    заявку под номером {proposalDeleteId ?? ''} ?
                    Отменить действие  будет невозможно
                </p>
                <Button
                    theme={ThemeButton.DELETE}
                    onClick={async () => { await handleDeleteProposal(proposalDeleteId) }}
                >
                    Удалить
                </Button>
                <Button
                    theme={ThemeButton.SECONDARY}
                    onClick={handleCloseModal}
                >
                    Отмена
                </Button>
            </Modal>
        </main>
    )
};

import { FC } from 'react'
import { ProposalDto } from 'entities/proposals/model/types'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import ShowIcon from 'shared/assets/images/icons/show.svg'
import DeleteIcon from 'shared/assets/images/icons/delete.svg'
import { useAppSelector } from 'app/store/hooks/redux'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { RoutePaths } from 'shared/config/routeConfig/routeConfig'
import cls from './ProposalRow.module.scss'

interface ProposalRowProps {
    /** Заявка. */
    proposal: ProposalDto
    /** Функция открытия модального окна. */
    onOpen: (id: number) => void
}

/** Компонент информации о заявке в виде ряда в таблице заявок. */
export const ProposalRow: FC<ProposalRowProps> = ({ proposal, onOpen }) => {
    const {
        person,
        id,
        status,
        city,
        auto
    } = proposal

    const {
        firstName,
        lastName,
        email,
        driverLicense
    } = person

    const { model, autoCategory } = auto
    const {
        autoCategoriesDictionary,
        citiesDictionary,
        statusesDictionary,
        autoModelsDictionary
    } = useAppSelector(state => state.dictionaryReducer)

    return (
        <tr className={cls.row}>
            <td className={cls.row__data}>
                {/**  Ссылка на страницу заявки. */}
                <AppLink
                    className={cls.menu__link}
                    to={`${RoutePaths.proposals}/${id}`}
                    theme={ThemeButton.CLEAR}
                >
                    <ShowIcon className={cls.row__edit}/>
                </AppLink>
            </td>
            <td className={cls.row__data}>
                {
                    /**  Кнопка открытия модального окна удаления заявки. */
                    (status.code === 'DRAFT') &&
                    <Button
                        className={cls.menu__link}
                        onClick={() => { onOpen(id) }}
                        theme={ThemeButton.CLEAR}
                    >
                        <DeleteIcon className={cls.row__delete}/>
                    </Button>
                }
            </td>
            <td className={cls.row__data}>{id}</td>
            <td className={cls.row__data}>{lastName} {firstName}</td>
            <td className={cls.row__data}>{driverLicense}</td>
            <td className={cls.row__data}>{email}</td>
            <td className={cls.row__data}>{statusesDictionary[status.code]}</td>
            <td className={cls.row__data}>{citiesDictionary[city.code]}</td>
            <td className={cls.row__data}>{autoCategoriesDictionary[autoCategory.code]}</td>
            <td className={cls.row__data}>{autoModelsDictionary[model.code]}</td>
        </tr>
    )
}

import { FC } from 'react'
import { ProposalDto } from 'entities/proposals/model/types'
import { useAppSelector } from 'app/store/hooks/redux'
import { InfoTooltip } from 'shared/ui/InfoTooltip/InfoTooltip'
import cls from './ProposalReadonly.module.scss'

interface ProposalReadonlyProps {
    /** Заявка. */
    proposal: ProposalDto
}

/** Компонент информации о заявке только для чтения. */
export const ProposalReadonly: FC<ProposalReadonlyProps> = ({ proposal }) => {
    const {
        citiesDictionary,
        autoCategoriesDictionary,
        autoModelsDictionary
    } = useAppSelector(state => state.dictionaryReducer)

    const {
        status,
        person,
        auto,
        city
    } = proposal

    return (
        <section className={cls.page}>
            <h1 className={cls.page__title}>Информация по заявке</h1>
            {/** В зависимости от статуса заявки, отображает характерное уведомление. */}
            <InfoTooltip status={status.code} />
            <ul className={cls.page__list}>
                <li className={cls.page__container}>
                    <p className={cls.page__text}>
                            Имя:
                        <span className={cls.page__value}>{person.firstName}</span>
                    </p>
                </li>
                <li className={cls.page__container}>
                    <p className={cls.page__text}>
                            Фамилия:
                        <span className={cls.page__value}>{person.lastName}</span>
                    </p>
                </li>
                <li className={cls.page__container}>
                    <p className={cls.page__text}>
                            Email:
                        <span className={cls.page__value}>{person.email}</span>
                    </p>
                </li>
                <li className={cls.page__container}>
                    <p className={cls.page__text}>
                            Водительское удостоверение:
                        <span className={cls.page__value}>{person.driverLicense}</span>
                    </p>
                </li>
                <li className={cls.page__container}>
                    <p className={cls.page__text}>
                            Марка автомобиля:
                        <span className={cls.page__value}>
                            {autoCategoriesDictionary[auto.autoCategory.code] ?? ''}
                        </span>
                    </p>
                </li>
                <li className={cls.page__container}>
                    <p className={cls.page__text}>
                            Модель автомобиля:
                        <span className={cls.page__value}>
                            {autoModelsDictionary[auto.model.code]}
                        </span>
                    </p>
                </li>
                <li className={cls.page__container}>
                    <p className={cls.page__text}>
                            Город:
                        <span className={cls.page__value}>
                            {citiesDictionary[city.code]}
                        </span>
                    </p>
                </li>
            </ul>
        </section>
    )
}

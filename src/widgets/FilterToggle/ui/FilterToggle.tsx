import { FC } from 'react'
import classNames from 'classnames'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { useDispatch } from 'react-redux'
import { proposalsSlice } from 'entities/proposals/model/proposalsSlice'
import { useAppSelector } from 'app/store/hooks/redux'
import cls from './FilterToggle.module.scss'

interface FilterToggleProps {
    /** Опциональный класс. */
    className?: string
}

/** Компонент выбора фильтра. */
export const FilterToggle: FC<FilterToggleProps> = (props) => {
    const { className = '' } = props
    const dispatch = useDispatch()
    const { statusesDictionary } = useAppSelector(state => state.dictionaryReducer)
    const { filter } = useAppSelector(state => state.proposalsReducer)
    const { changeFilter } = proposalsSlice.actions

    /** Изменяет фильтр. */
    const toggleFilter = (status: string): void => { dispatch(changeFilter(status)) }

    /** Проверяет активность фильтра. */
    const isActive = (status: string): boolean => { return status === filter }

    return (
        <ul className={classNames(cls.list, className)}>
            {/** Кнопка для отображения всех заявок. */}
            <li key={0} className={cls.list__item}>
                <Button
                    className={classNames({ [cls.list__button_active]: isActive('ALL') })}
                    theme={ThemeButton.SECONDARY}
                    disabled={isActive('ALL')}
                    onClick={() => { toggleFilter('ALL') }}
                >
                    Все
                </Button>
            </li>
            {/** Отрисовка кнопок фильтров для всех статусов из словаря . */
                Object.entries(statusesDictionary)
                    ?.map(([status, title], index) => {
                        return (
                            <li key={index + 1} className={cls.list__item}>
                                <Button
                                    className={classNames({ [cls.list__button_active]: isActive(status) })}
                                    theme={ThemeButton.SECONDARY}
                                    disabled={isActive(status)}
                                    onClick={() => { toggleFilter(status) }}
                                >
                                    {title}
                                </Button>
                            </li>
                        )
                    })
            }
        </ul>
    )
}

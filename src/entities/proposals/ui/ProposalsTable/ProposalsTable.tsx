import React, { FC, ReactNode, TableHTMLAttributes, useState } from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { proposalsSlice } from 'entities/proposals/model/proposalsSlice'
import { Sort, SortValues } from 'entities/proposals/model/types'
import cls from './ProposalsTable.module.scss'

interface ProposalsTableProps extends TableHTMLAttributes<HTMLTableElement> {
    /** Опциональный класс. */
    className?: string
    /** Дочерний элемент. */
    children: ReactNode
}

/** Компонент таблицы заявок. */
export const ProposalsTable: FC<ProposalsTableProps> = (props) => {
    const { className = '', children } = props
    const dispatch = useDispatch()
    const { changeSort } = proposalsSlice.actions
    const [activeSort, setActiveSort] = useState<string>(SortValues.SORT_BY_ID)

    /** Изменяет вид сортировки. */
    const toggleSort = (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>): void => {
        const sort: Sort = e.currentTarget.dataset.sortType as Sort ?? SortValues.SORT_BASE
        const sortReverse: Sort = e.currentTarget.dataset.sortTypeReverse as Sort ?? SortValues.SORT_BASE

        if (activeSort === sort) {
            dispatch(changeSort(sortReverse))
            setActiveSort(sortReverse)
        } else {
            dispatch(changeSort(sort))
            setActiveSort(sort)
        }
    }

    return (
        <table className={classNames(cls.table, className)}>
            <thead className={cls.table__head}>
                <tr className={cls.table__row}>
                    <th className={cls.table__heading} rowSpan={2}></th>
                    <th className={cls.table__heading} rowSpan={2}></th>
                    <th className={cls.table__heading} colSpan={4}>
                        Персональная информация
                    </th>
                    {/** Заголовок столбца таблицы. */}
                    <th
                        className={classNames(
                            cls.table__heading,
                            {
                                [cls.table__heading_active]: SortValues.SORT_BY_STATUS === activeSort,
                                [cls.table__heading_reverse]: SortValues.SORT_BY_STATUS_REVERSE === activeSort
                            }
                        )}
                        rowSpan={2}
                        data-sort-type={SortValues.SORT_BY_STATUS}
                        data-sort-type-reverse={SortValues.SORT_BY_STATUS_REVERSE}
                        onClick={(e) => { toggleSort(e) }}
                    >
                        Статус заявки
                    </th>
                    <th
                        className={classNames(
                            cls.table__heading,
                            {
                                [cls.table__heading_active]: SortValues.SORT_BY_CITY === activeSort,
                                [cls.table__heading_reverse]: SortValues.SORT_BY_CITY_REVERSE === activeSort
                            }
                        )}
                        rowSpan={2}
                        data-sort-type={SortValues.SORT_BY_CITY}
                        data-sort-type-reverse={SortValues.SORT_BY_CITY_REVERSE}
                        onClick={(e) => { toggleSort(e) }}
                    >
                        Город
                    </th>
                    <th className={cls.table__heading} colSpan={2}>Автомобиль</th>
                </tr>
                <tr className={cls.table__row}>
                    <th
                        className={classNames(
                            cls.table__heading,
                            {
                                [cls.table__heading_active]: SortValues.SORT_BY_ID === activeSort,
                                [cls.table__heading_reverse]: SortValues.SORT_BY_ID_REVERSE === activeSort
                            }
                        )}
                        data-sort-type={SortValues.SORT_BY_ID}
                        data-sort-type-reverse={SortValues.SORT_BY_ID_REVERSE}
                        onClick={(e): void => { toggleSort(e) }}
                    >
                        ID
                    </th>
                    <th
                        className={classNames(
                            cls.table__heading,
                            {
                                [cls.table__heading_active]: SortValues.SORT_BY_LASTNAME === activeSort,
                                [cls.table__heading_reverse]: SortValues.SORT_BY_LASTNAME_REVERSE === activeSort
                            }
                        )}
                        data-sort-type={SortValues.SORT_BY_LASTNAME}
                        data-sort-type-reverse={SortValues.SORT_BY_LASTNAME_REVERSE}
                        onClick={(e): void => { toggleSort(e) }}
                    >
                        ФИО
                    </th>
                    <th
                        className={classNames(
                            cls.table__heading,
                            {
                                [cls.table__heading_active]: SortValues.SORT_BY_DRIVER_LICENCE === activeSort,
                                [cls.table__heading_reverse]: SortValues.SORT_BY_DRIVER_LICENCE_REVERSE === activeSort
                            }
                        )}
                        data-sort-type={SortValues.SORT_BY_DRIVER_LICENCE}
                        data-sort-type-reverse={SortValues.SORT_BY_DRIVER_LICENCE_REVERSE}
                        onClick={(e): void => { toggleSort(e) }}
                    >
                        Удостоверение
                    </th>
                    <th
                        className={classNames(
                            cls.table__heading,
                            {
                                [cls.table__heading_active]: SortValues.SORT_BY_EMAIL === activeSort,
                                [cls.table__heading_reverse]: SortValues.SORT_BY_EMAIL_REVERSE === activeSort
                            }
                        )}
                        data-sort-type={SortValues.SORT_BY_EMAIL}
                        data-sort-type-reverse={SortValues.SORT_BY_EMAIL_REVERSE}
                        onClick={(e): void => { toggleSort(e) }}
                    >
                        Почта
                    </th>
                    <th
                        className={classNames(
                            cls.table__heading,
                            {
                                [cls.table__heading_active]: SortValues.SORT_BY_AUTO_CATEGORY === activeSort,
                                [cls.table__heading_reverse]: SortValues.SORT_BY_AUTO_CATEGORY_REVERSE === activeSort
                            }
                        )}
                        data-sort-type={SortValues.SORT_BY_AUTO_CATEGORY}
                        data-sort-type-reverse={SortValues.SORT_BY_AUTO_CATEGORY_REVERSE}
                        onClick={(e): void => { toggleSort(e) }}
                    >
                        Категория
                    </th>
                    <th
                        className={classNames(
                            cls.table__heading,
                            {
                                [cls.table__heading_active]: SortValues.SORT_BY_MODEL === activeSort,
                                [cls.table__heading_reverse]: SortValues.SORT_BY_MODEL_REVERSE === activeSort
                            }
                        )}
                        data-sort-type={SortValues.SORT_BY_MODEL}
                        data-sort-type-reverse={SortValues.SORT_BY_MODEL_REVERSE}
                        onClick={(e): void => { toggleSort(e) }}
                    >
                        Модель
                    </th>
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    )
}

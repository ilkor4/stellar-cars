import { FC } from 'react'
import classNames from 'classnames'
import { Card } from 'shared/ui/Card'
import { CategoryType } from 'entities/dictionary/model/types'
import cls from './AutoCategory.module.scss'

interface AutoCategoryProps {
    /** Опциональный класс. */
    className?: string
    /** Массив категорий. */
    categoryArray: CategoryType[]
    /** Название категории. */
    categoryName: string
}

/** Компонент категории автомобилей. */
export const AutoCategory: FC<AutoCategoryProps> = (props) => {
    const {
        className = '',
        categoryName,
        categoryArray
    } = props

    const title = (categoryArray.length > 0)
        ? `Модельный ряд ${categoryName ?? ''}`
        : ''

    return (
        <section className={classNames(cls.category, className)}>
            <h2 className={cls.category__title}>{title}</h2>
            <ul className={cls.category__list}>
                {categoryArray
                    .map(({
                        id,
                        name,
                        code
                    }) => {
                        return (
                            <Card
                                key={id}
                                categoryName={categoryName}
                                name={name}
                                code={code}
                            />
                        )
                    })}
            </ul>
        </section>
    )
}

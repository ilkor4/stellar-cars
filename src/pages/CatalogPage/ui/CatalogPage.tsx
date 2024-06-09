import { JSX } from 'react'
import { AutoCategory } from 'widgets/AutoCategory'
import { useAppSelector } from 'app/store/hooks/redux'
import cls from './CatalogPage.module.scss'

/** Страница каталога автомобилей. */
export default function CatalogPage (): JSX.Element {
    const { autoDictionary, autoCategories } = useAppSelector(state => state.dictionaryReducer)

    return (
        <main className={cls.page}>
            {/** Создает разметку категории автомобилей для каждого ключа словаря авто. */}
            {Object.entries(autoDictionary)
                ?.map(([key, categoryArray]) => {
                    return (
                        <AutoCategory
                            key={key}
                            categoryName={autoCategories[+key]}
                            categoryArray={categoryArray}
                        />
                    )
                })}
        </main>
    )
}

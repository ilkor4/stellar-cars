import { FC } from 'react'
import cls from './PageError.module.scss'

/** Компонент ошибки на всю страницу. */
export const PageError: FC = () => {
    /** Обновляет страницу. */
    const reloadPage = (): void => {
        location.reload()
    }

    return (
        <div className={cls.page}>
            <p className={cls.page__text}>Произошла ошибка</p>
            <button
                onClick={reloadPage}
            >
                Обновить страницу
            </button>
        </div>
    )
}

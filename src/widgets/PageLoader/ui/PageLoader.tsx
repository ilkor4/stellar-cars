import classNames from 'classnames'
import { FC } from 'react'
import { Loader } from 'shared/ui/Loader/Loader'
import cls from './PageLoader.module.scss'

interface PageLoaderProps {
    /** Опциональный класс. */
    className?: string
}

/** Компонент лоудера на всю страницу. */
export const PageLoader: FC<PageLoaderProps> = ({ className }) => {
    return (
        <div className={classNames(cls.page, {}, [className ?? ''])}>
            <Loader />
        </div>
    )
}

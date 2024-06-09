import { FC } from 'react'
import classNames from 'classnames'
import cls from './Loader.module.scss'

interface LoaderProps {
    /** Опциональный класс. */
    className?: string
}

/** Компонент лоудера. */
export const Loader: FC<LoaderProps> = (props) => {
    const {
        className = ''
    } = props

    return (
        <div className={classNames(cls.loader, className)} />
    )
}

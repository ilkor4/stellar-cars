import classNames from 'classnames'
import { Link, LinkProps } from 'react-router-dom'
import { FC } from 'react'
import cls from './AppLink.module.scss'

/** Перечисление тем ссылки. */
export enum AppLinkTheme {
    PRIMARY = 'link_primary',
    SECONDARY = 'link_secondary',
    TERTIARY = 'link_tertiary',
    PROPOSAL = 'link_proposal',
    CLEAR = 'link_clear'
}

/** Компонент кнопки приложения. */
interface AppLinkProps extends LinkProps {
    /** Опциональный класс. */
    className?: string
    /** Опциональная тема. */
    theme?: string
}
/** Компонент ссылки приложения. */
export const AppLink: FC<AppLinkProps> = (props) => {
    const {
        to,
        className = '',
        theme = AppLinkTheme.PRIMARY,
        children,
        ...otherProps
    } = props

    return (
        <Link
            className={classNames(cls.link, className, cls[theme])}
            to={to}
            {...otherProps}
        >
            {children}
        </Link>
    )
}

import classNames from 'classnames'
import { ButtonHTMLAttributes, FC } from 'react'
import cls from './Button.module.scss'

/** Перечисление тем кнопки. */
export enum ThemeButton {
    CLEAR = 'button_clear',
    PRIMARY = 'button_primary',
    SECONDARY = 'button_secondary',
    DISABLED = 'button_disabled',
    DELETE = 'button_delete',
    PENDING = 'button_pending',
    SUCCESS = 'button_success'
}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Опциональный класс. */
    className?: string
    /** Опциональная тема. */
    theme?: ThemeButton
}

/** Компонент кнопки приложения. */
export const Button: FC<ButtonProps> = (props) => {
    const {
        className = '',
        theme = ThemeButton.CLEAR,
        children,
        ...otherProps
    } = props

    return (
        <button
            className={classNames(cls.button, className, cls[theme])}
            {...otherProps}
        >
            {children}
        </button>
    )
}

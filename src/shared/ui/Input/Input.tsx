import { forwardRef, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import cls from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    /** Опциональный класс. */
    className?: string
    /** Тип поля. */
    type: HTMLInputTypeAttribute
    /** Опциональная валидность. */
    isValid?: boolean
    /** Опциональный заголовок. */
    title?: string
}

/** Компонент инпута. */
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        className = '',
        type,
        isValid = true,
        title = '',
        ...otherProps
    } = props

    return (
        <label className={cls.label}>
            {title}
            <input
                className={classNames(
                    cls.label__input,
                    className,
                    { [cls.label__input_invalid]: !isValid }
                )}
                ref={ref}
                type={type}
                {...otherProps}
            />
        </label>
    )
})

Input.displayName = 'Input'

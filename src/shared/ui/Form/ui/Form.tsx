import { FC, FormHTMLAttributes } from 'react'
import classNames from 'classnames'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import cls from './Form.module.scss'

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    /** Опциональный класс. */
    className?: string
    /** Название формы. */
    name: string
    /** Заголовок формы. */
    legend: string
    /** Заголовок кнопки подтверждения. */
    submitTitle: string
    /** Опциональная валидность. */
    isValid?: boolean
    /** Опциональная загрузка. */
    loading?: boolean
}

/** Компонент формы. */
export const Form: FC<FormProps> = (props) => {
    const {
        className = '',
        name,
        legend,
        children,
        submitTitle,
        isValid = true,
        loading = false,
        ...otherProps
    } = props

    return (
        <form
            className={classNames(cls.form, className)}
            name={name}
            {...otherProps}
        >
            <legend className={cls.form__legend}>
                {legend}
            </legend>
            <fieldset className={cls.form__fieldset}>
                {children}
                <Button
                    type="submit"
                    theme={ !isValid || loading ? ThemeButton.DISABLED : ThemeButton.PRIMARY}
                    disabled={ !isValid }
                >
                    {!loading ? submitTitle : 'Подождите...'}
                </Button>
            </fieldset>
        </form>
    )
}

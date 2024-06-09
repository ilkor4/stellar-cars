import { FC } from 'react'
import classNames from 'classnames'
import { useAppSelector } from 'app/store/hooks/redux'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { useGetUserQuery } from 'entities/User/services/userSevise'
import cls from './User.module.scss'

interface UserProps {
    /** Класс. */
    className?: string
}

/** Компонент пользователя. */
export const User: FC<UserProps> = (props) => {
    const { className = '' } = props
    const { isLogged } = useAppSelector(state => state.authReducer)
    const { data } = useGetUserQuery(null, {
        skip: !isLogged
    })

    /** Совершает выход пользователя из приложения. */
    const handleLogout = (): void => {
        localStorage.removeItem('access_token')
        location.reload()
    }

    return (
        <section className={classNames(cls.user, className)}>
            <div className={cls.user__container}>
                <p className={cls.user__text}>Id: {data?.id}</p>
            </div>
            <div className={cls.user__container}>
                <p className={cls.user__text}>Логин: {data?.login}</p>
            </div>
            <Button
                className={cls.user__button}
                type="button"
                theme={ThemeButton.PRIMARY}
                onClick={handleLogout}
            >
                Выйти
            </Button>
        </section>
    )
}

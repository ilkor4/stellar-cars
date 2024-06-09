import { JSX } from 'react'
import { Input } from 'shared/ui/Input/Input'
import { Form } from 'shared/ui/Form/ui/Form'
import cls from './RegisterPage.module.scss'
import classNames from 'classnames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { RoutePaths } from 'shared/config/routeConfig/routeConfig'

/** Страница регистрации пользователя. */
export const RegisterPage = (): JSX.Element => {
    return (
        <main className={cls.page}>
            <Form
                className={cls.page__form}
                legend="Регистрация"
                name="register"
                submitTitle="Зарегистрироваться"
            >
                <Input
                    type="name"
                    name="name"
                    placeholder="Имя"
                    required
                />
                <Input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    required
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    required
                />
            </Form>
            <p className={classNames(cls.additional, cls.page__additional)}>
                Уже зарегистрированы?
                <AppLink
                    className={cls.additional__link}
                    to={RoutePaths['sign-in']}
                    theme={AppLinkTheme.SECONDARY}
                >
                    Войти
                </AppLink>
            </p>
        </main>
    )
}

import { JSX } from 'react'
import classNames from 'classnames'
import { Form } from 'shared/ui/Form/ui/Form'
import { Input } from 'shared/ui/Input/Input'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { RoutePaths } from 'shared/config/routeConfig/routeConfig'
import { Loader } from 'shared/ui/Loader/Loader'
import { LoginDto } from 'entities/auth/model/types'
import { useAppDispatch } from 'app/store/hooks/redux'
import { authSlice } from 'entities/auth/model/authSlice'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { authSchema } from 'shared/ui/Form/lib/utils/validations/schemes'
import { authApi } from 'entities/auth/services/authServise'
import cls from './LoginPage.module.scss'

/** Страница входа. */
export const LoginPage = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const { changeTokenState } = authSlice.actions
    const [fetchAuth, { data: message, error, isLoading }] = authApi.useLazyAuthQuery()
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<LoginDto>({
        mode: 'onChange',
        resolver: yupResolver(authSchema)
    })

    /** Получает токен. */
    const onSubmit: SubmitHandler<LoginDto> = async (userInfo: LoginDto): Promise<void> => {
        try {
            await fetchAuth(userInfo, true).unwrap()
            dispatch(changeTokenState(true))
        } catch (err) {
            console.log(`Запрос выполнен с ошибкой: ${+err}`)
        }
        reset()
    }

    return (
        <main className={cls.page}>
            <Form
                className={cls.page__form}
                legend="Вход"
                name="register"
                submitTitle="Войти"
                loading={isLoading}
                isValid={ isValid}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    {...register('login')}
                    type="text"
                    placeholder="Логин"
                    isValid={errors.login?.message === undefined}
                />
                <p className={cls.page__validation}>{errors.login?.message}</p>
                <Input
                    {...register('password')}
                    type="password"
                    placeholder="Пароль"
                    isValid={errors.password?.message === undefined}
                />
                <p className={cls.page__validation}>{errors.password?.message}</p>
            </Form>
            {/** Состояние загрузки. */}
            {isLoading && <Loader className={cls.page__loader} />}
            <p className={cls.page__success}>{message}</p>
            {/** Показ ошибки. */
                (error !== undefined) &&
                <p className={cls.page__error}>Запрос выполнен с ошибкой: {+error}</p>
            }
            <p className={classNames(cls.additional, cls.page__additional)}>
                Вы — новый пользователь?
                <AppLink
                    className={cls.additional__link}
                    to={RoutePaths['sign-up']}
                    theme={AppLinkTheme.SECONDARY}
                >
                    Зарегистрироваться
                </AppLink>
            </p>
        </main>
    )
}

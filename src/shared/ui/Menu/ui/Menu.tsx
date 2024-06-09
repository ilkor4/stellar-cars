import { FC } from 'react'
import LogoIcon from 'shared/assets/images/logo.svg'
import ListIcon from 'shared/assets/images/icons/view-list.svg'
import CatalogIcon from 'shared/assets/images/icons/drag.svg'
import ProfileIcon from 'shared/assets/images/icons/profile.svg'
import LightIcon from 'shared/assets/images/icons/light.svg'
import classNames from 'classnames'
import { RoutePaths } from 'shared/config/routeConfig/routeConfig'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { useDispatch } from 'react-redux'
import { themeSlice } from 'features/theme/model/themeSlice'
import { useAppSelector } from 'app/store/hooks/redux'
import { Theme } from 'features/theme/model/types'
import cls from './Menu.module.scss'

interface MenuProps {
    /** Опциональный класс. */
    className?: string
}

/** Компонент меню приложения. */
export const Menu: FC<MenuProps> = (props) => {
    const { className = '' } = props
    const dispatch = useDispatch()
    const { isLogged } = useAppSelector(state => state.authReducer)
    const { theme } = useAppSelector(state => state.themeReducer)
    const { changeTheme } = themeSlice.actions

    /** Меняет тему на противоположную. */
    const toggleTheme = (): void => {
        if (theme === Theme.DARK) {
            dispatch(changeTheme(Theme.LIGHT))
        } else {
            dispatch(changeTheme(Theme.DARK))
        }
    }

    return (
        <nav className={classNames(cls.menu, className)}>
            <ul className={cls.menu__list}>
                <li
                    className={classNames(
                        cls.menu__item,
                        cls.menu__link_order,
                        { [cls.menu__item_disabled]: !isLogged }
                    )}
                >
                    <AppLink to={RoutePaths.proposals} className={cls.menu__link}>
                        <ListIcon className={cls.menu__link_order}/>
                        Заявки
                    </AppLink>
                    <AppLink to={RoutePaths.main} className={cls.menu__link}>
                        <CatalogIcon className={cls.menu__link_catalog}/>
                        Каталог
                    </AppLink>
                </li>
                <li
                    className={classNames(
                        cls.menu__item,
                        cls.menu__item_logo,
                        { [cls.menu__item_disabled]: !isLogged }
                    )}
                >
                    <AppLink className={cls.menu__link} to={RoutePaths.main}>
                        <LogoIcon />
                    </AppLink>
                </li>
                <li
                    className={classNames(
                        cls.menu__item,
                        [cls.menu__item_profile],
                        { [cls.menu__item_disabled]: !isLogged }
                    )}
                >
                    <AppLink className={cls.menu__link} to={RoutePaths.user}>
                        <ProfileIcon className={cls.menu__link_profile}/>
                        Личный кабинет
                    </AppLink>
                    <Button
                        className={cls.menu__link}
                        onClick={toggleTheme}
                        theme={ThemeButton.CLEAR}
                    >
                        <LightIcon className={cls.menu__link_light}/>
                        Тема
                    </Button>
                </li>
            </ul>
        </nav>
    )
}

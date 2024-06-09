import { FC } from 'react'
import { Menu } from 'shared/ui/Menu'
import classNames from 'classnames'
import cls from './Navbar.module.scss'
interface NavbarProps {
    /** Опциональный класс. */
    className?: string
}

/** Компонент навигации. */
export const Navbar: FC<NavbarProps> = (props) => {
    const {
        className = ''
    } = props
    return (
        <header className={classNames(cls.navbar, className)}>
            <Menu />
        </header>
    )
}

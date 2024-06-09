import { JSX } from 'react'
import { User } from 'entities/User'
import cls from './UserPage.module.scss'

/** Страница пользователя. */
export default function UserPage (): JSX.Element {
    return (
        <main className={cls.page}>
            <User />
        </main>
    )
}

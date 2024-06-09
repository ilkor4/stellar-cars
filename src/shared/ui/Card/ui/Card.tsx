import { FC } from 'react'
import classNames from 'classnames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { RoutePaths } from 'shared/config/routeConfig/routeConfig'
import WheelIcon from 'shared/assets/images/icons/wheel.svg'
import { AutoImages, AutoSubtitles } from 'shared/ui/Card/lib/utils/constants'
import cls from './Card.module.scss'

interface CardProps {
    /** Опциональный класс. */
    className?: string
    /** Имя категории. */
    categoryName: string
    /** Имя. */
    name: string
    /** Код. */
    code: string
}

/** Компонент карточки. */
export const Card: FC<CardProps> = (props) => {
    const {
        className = '',
        categoryName,
        name,
        code
    } = props

    const subtitle = AutoSubtitles[code] ?? AutoSubtitles.BASE
    const backgroundImage = AutoImages[code] ?? AutoImages.BASE
    const title = `${categoryName} ${name}`

    return (
        <li className={classNames(cls.card, className)}>
            <div
                className={cls.card__image}
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className={cls.card__description}>
                <h3 className={cls.card__title}>{title}</h3>
                <p className={cls.card__subtitle}>{subtitle}</p>
                <AppLink
                    className={cls.card__button}
                    to={RoutePaths.proposals}
                    theme={AppLinkTheme.TERTIARY}
                >
                    Оставить заявку
                    <WheelIcon
                        className={cls.card__wheel}
                    />
                </AppLink>
            </div>
        </li>
    )
}

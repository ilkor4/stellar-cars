import { FC } from 'react'
import classNames from 'classnames'
import { renderProposalStatusText } from 'entities/proposals/lib/renderProposalStatusText'
import cls from './InfoTooltip.module.scss'

/** Перечисление тем уведомления. */
export const ThemeTooltip: Record<string, string> = {
    PRIMARY: 'tooltip_primary',
    SUCCESS: 'tooltip_success',
    REJECTED: 'tooltip_rejected',
    PENDING: 'tooltip_pending'
}

interface InfoTooltipProps {
    /** Опциональный класс. */
    className?: string
    /** Статус заявки. */
    status: string
}

/** Компонент уведомления. */
export const InfoTooltip: FC<InfoTooltipProps> = (props) => {
    const {
        className = '',
        status
    } = props

    return (
        <div className={classNames(cls.tooltip, className, cls[ThemeTooltip[status]])}>
            <p className={cls.tooltip__message}>{renderProposalStatusText(status)}</p>
        </div>
    )
}

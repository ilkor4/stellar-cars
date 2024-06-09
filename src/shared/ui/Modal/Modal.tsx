import classNames from 'classnames'
import React, { FC, ReactNode } from 'react'
import CloseIcon from 'shared/assets/images/icons/close.svg'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Loader } from 'shared/ui/Loader/Loader'
import ErrorIcon from 'shared/assets/images/icons/info.svg'
import SuccessIcon from 'shared/assets/images/icons/ok.svg'
import cls from './Modal.module.scss'

interface ModalProps {
    /** Опциональный класс. */
    className?: string
    /** Открыто ли модальное окно. */
    isOpen: boolean
    /** Функция закрытия. */
    onClose: () => void
    /** Возникла ли ошибка. */
    isError: boolean
    /** Успешен ли запрос. */
    isSuccess: boolean
    /** Идет ли загрузка. */
    isLoading: boolean
    /** Дочерние элементы. */
    children: ReactNode
}

/** Компонент модального окна. */
export const Modal: FC<ModalProps> = (props) => {
    const {
        onClose,
        isOpen,
        isLoading,
        isError,
        isSuccess,
        children
    } = props

    /** Останавливаем всплытие по клику. */
    const onContentClick = (e: React.MouseEvent): void => {
        e.stopPropagation()
    }

    return (
        <div className={classNames(cls.modal, { [cls.modal_opened]: isOpen })}>
            <div
                className={cls.modal__overlay}
                onClick={onClose}
            >
                <div
                    className={cls.modal__content}
                    onClick={onContentClick}
                >
                    <Button
                        className={cls.modal__close}
                        theme={ThemeButton.CLEAR}
                        onClick={onClose}
                    >
                        <CloseIcon className={cls.modal__close}/>
                    </Button>
                    { /** Показ дочернего компонента. */}
                    {!isError && !isSuccess && children}
                    { /** Состояние загрузки. */}
                    {isLoading && <Loader />}
                    { /** Показ ошибки. */}
                    {isError &&
                        <>
                            <ErrorIcon fill="red" />
                            <p className={cls.modal__error}>Запрос выполнен с ошибкой</p>
                        </>
                    }
                    {isSuccess &&
                        <>
                            <SuccessIcon fill="#0cc" />
                            <p className={cls.modal__success}>Запрос успешно выполнен</p>
                        </>}
                </div>
            </div>
        </div>
    )
}

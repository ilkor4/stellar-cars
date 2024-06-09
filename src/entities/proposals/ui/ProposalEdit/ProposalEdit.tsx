import { FC, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form } from 'shared/ui/Form/ui/Form'
import { Input } from 'shared/ui/Input/Input'
import Select from 'react-select'
import { Loader } from 'shared/ui/Loader/Loader'
import { useAppSelector } from 'app/store/hooks/redux'
import { transformToOptions } from 'entities/proposals/lib/transformToOptions'
import { proposalSchema } from 'shared/ui/Form/lib/utils/validations/schemes'
import { customStyles } from 'shared/ui/Form/lib/utils/select/selectStyles'
import { transformToProposalRequestData } from 'entities/proposals/lib/transformToProposalRequestData'
import { useNavigate } from 'react-router-dom'
import { RoutePaths } from 'shared/config/routeConfig/routeConfig'
import { transformAutoCategoriesToOptions } from 'entities/proposals/lib/transformAutoCategoriesToOptions'
import { Modal } from 'shared/ui/Modal/Modal'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import {
    OptionsDataType,
    ProposalDto,
    ProposalsInfoType
} from 'entities/proposals/model/types'
import {
    useChangeProposalMutation,
    useDeleteProposalMutation,
    useSendProposalMutation
} from 'entities/proposals/services/proposalsService'
import cls from './ProposalEdit.module.scss'

export interface ProposalEditProps {
    /** Информация по заявке. */
    proposal: ProposalDto
    /** Функция открытия модального окна лоудера. */
    onOpenModalWithLoader: () => void
}

/** Компонент формы редактирования данных заявки. */
export const ProposalEdit: FC<ProposalEditProps> = ({ proposal, onOpenModalWithLoader }) => {
    const navigate = useNavigate()
    /** Достаем нужные данные. */
    const { city, auto, id } = proposal
    const {
        lastName,
        firstName,
        driverLicense,
        email
    } = proposal.person
    const {
        citiesDictionary,
        autoCategoriesNamesDictionary,
        autoModelsDictionary,
        autoCategoriesDictionary,
        autoDictionary
    } = useAppSelector(state => state.dictionaryReducer)
    /** Создаем форму с валидацией по схеме заявки. */
    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        watch,
        formState: {
            errors,
            isValid
        }
    } = useForm<ProposalsInfoType>({
        mode: 'onChange',
        resolver: yupResolver(proposalSchema),
        /** Добавляем значения заявки в исходные значения формы. */
        defaultValues: {
            lastName,
            firstName,
            driverLicense,
            email,
            autoCategory: {
                value: auto.autoCategory.code,
                label: autoCategoriesDictionary[auto.autoCategory.code]
            },
            model: {
                value: auto.model.code,
                label: autoModelsDictionary[auto.model.code]
            },
            city: {
                value: city.code,
                label: citiesDictionary[city.code]
            }
        }
    })
    const [activeModelsData, setActiveModelsData] = useState<OptionsDataType[]>([])
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false)
    const [proposalDeleteId, setDeleteIdProposal] = useState<number | null>(null)
    const [counterChangeModels, setCounterChangeModels] = useState<number>(0)
    const [changeProposal, { isSuccess, error, isLoading }] = useChangeProposalMutation()
    const [sendProposal, { error: sendError }] = useSendProposalMutation()
    const selectedAutoCategory = watch('autoCategory')
    const [deleteProposal, {
        isLoading: isDeleteLoading,
        isSuccess: isDeleteSuccess,
        isError: isDeleteErr
    }] = useDeleteProposalMutation()

    /**
     * Эффект, который исполнятся на каждое изменения состояния категории авто.
     * Если выбрана категория и это не исходное значение,
     * то обнуляем модель и изменяем активные модели для выбора.
     * Если исходное значение, то изменяем активные модели и увеличиваем счетчик.
     */
    useEffect(() => {
        if (selectedAutoCategory !== undefined && (counterChangeModels > 1)) {
            const categoryId = autoCategoriesNamesDictionary[selectedAutoCategory.value]
            const modelsArr = autoDictionary[categoryId]

            setValue('model', { label: '', value: '' })
            setActiveModelsData(transformAutoCategoriesToOptions(modelsArr))
            setCounterChangeModels(prevState => prevState + 1)
        } else {
            /** Убирает очищение исходного значения. */
            const categoryId = autoCategoriesNamesDictionary[auto.autoCategory.code]
            const modelsArr = autoDictionary[categoryId]

            setActiveModelsData(transformAutoCategoriesToOptions(modelsArr))
            setCounterChangeModels(prevState => prevState + 1)
        }
    }, [selectedAutoCategory])

    /** Открывает модальное окно удаления заявки. */
    const handleOpenModal = (id: number): void => {
        setDeleteIdProposal(id)
        setIsModalDeleteOpen(true)
    }

    /** Закрывает модальное окно удаления заявки. */
    const handleCloseModal = (): void => {
        setDeleteIdProposal(null)
        setIsModalDeleteOpen(false)
    }

    /** Отправляет запрос на редактирования заявки. */
    const handleChangeProposal: SubmitHandler<ProposalsInfoType> = async (proposalInfo: ProposalsInfoType) => {
        try {
            /** Трансформирует данные в формат запроса. */
            const proposalResponseData = transformToProposalRequestData(proposalInfo)

            proposalResponseData.id = +id

            await changeProposal(proposalResponseData).unwrap()
        } catch (err) {
            console.log(`Запрос выполнен с ошибкой: ${+err}`)
        }
        reset()
    }

    /** Отправляет запрос на удаление заявки. */
    const handleDeleteProposal = async (id: number): Promise<void> => {
        try {
            await deleteProposal(id).unwrap()

            navigate(RoutePaths.proposals, { replace: true })
        } catch (err) {
            console.log(err)
        }
    }

    /** Отправляет запрос на Рассмотрение заявки. */
    const handleSendProposal = async (id: number): Promise<void> => {
        try {
            await sendProposal(id).unwrap()

            onOpenModalWithLoader()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Form
                className={cls.page__form}
                legend="Изменить заявку"
                name="edit-proposal"
                submitTitle="Сохранить"
                loading={isLoading}
                isValid={isValid}
                onSubmit={handleSubmit(handleChangeProposal)}
            >
                <p className={cls.page__validation}>{errors.root?.message}</p>
                <Input
                    {...register('firstName')}
                    type="text"
                    title="Имя:"
                    placeholder="Имя"
                    isValid={errors.firstName?.message === undefined}
                />
                <p className={cls.page__validation}>{errors.firstName?.message}</p>
                <Input
                    {...register('lastName')}
                    type="text"
                    title="Фамилия:"
                    placeholder="Фамилия"
                    isValid={errors.lastName?.message === undefined}
                />
                <p className={cls.page__validation}>{errors.lastName?.message}</p>
                <Input
                    {...register('email')}
                    type="email"
                    title="Email:"
                    placeholder="Email"
                    isValid={errors.email?.message === undefined}
                />
                <p className={cls.page__validation}>{errors.email?.message}</p>
                <Input
                    {...register('driverLicense')}
                    type="text"
                    title="Водительское удостоверение:"
                    placeholder="Водительское удостоверение"
                    isValid={errors.driverLicense?.message === undefined}
                />
                <p className={cls.page__validation}>{errors.driverLicense?.message}</p>
                <p className={cls.page__label}>Выберите город:</p>
                <Controller
                    name="city"
                    control={control}
                    render={({ field }) =>
                        <Select
                            {...field}
                            styles={customStyles}
                            classNamePrefix={cls.page__select}
                            placeholder={'Выберите город'}
                            options={transformToOptions(citiesDictionary)}
                        />}
                />
                <p className={cls.page__label}>Выберите марку автомобиля:</p>
                <Controller
                    name="autoCategory"
                    control={control}
                    render={({ field }) =>
                        <Select
                            {...field}
                            styles={customStyles}
                            placeholder={'Выберите марку автомобиля'}
                            options={transformToOptions(autoCategoriesDictionary)}
                        />}
                />
                <p className={cls.page__label}>Выберите модель автомобиля:</p>
                <Controller
                    name="model"
                    control={control}
                    render={({ field }) =>
                        <Select
                            {...field}
                            styles={customStyles}
                            placeholder={'Выберите модель автомобиля'}
                            options={activeModelsData}
                        />}
                />
                <p className={cls.page__validation}>{errors.model?.label?.message}</p>
                {/** Оператор отслеживающий состояние загрузки запроса на изменение заявки. */}
                { isLoading && <Loader className={cls.page__loader} />}
                {/** Оператор отслеживающий состояние ошибки изменения заявки. */
                    (error !== undefined) &&
                    <p className={cls.page__error}>Запрос выполнен с ошибкой: {+error}</p>
                }
                {/** Оператор отслеживающий состояние ошибки изменения заявки. */
                    (sendError !== undefined) &&
                    <p className={cls.page__error}>Запрос выполнен с ошибкой: {+sendError}</p>
                }
                {/** Оператор отслеживающий состояние успешности запроса изменения заявки. */
                    isSuccess && <p className={cls.page__success}>Заявка успешно изменена!</p>
                }
            </Form>
            <Button
                className={cls.menu__link}
                onClick={async () => { await handleSendProposal(id) }}
                theme={isValid ? ThemeButton.SUCCESS : ThemeButton.DISABLED}
                disabled={!isValid}
            >
                Отправить на рассмотрение
            </Button>
            <Button
                className={cls.menu__link}
                onClick={() => { handleOpenModal(id) }}
                theme={ThemeButton.DELETE}
            >
                Удалить
            </Button>
            <Modal
                isOpen={isModalDeleteOpen}
                onClose={handleCloseModal}
                isSuccess={isDeleteSuccess}
                isError={isDeleteErr}
                isLoading={isDeleteLoading}
            >
                <p className={cls.page__info}>
            Вы точно уверены, что хотите удалить
            заявку под номером {proposalDeleteId ?? ''} ?
            Отменить действие  будет невозможно
                </p>
                <Button
                    theme={ThemeButton.DELETE}
                    onClick={async () => { await handleDeleteProposal(id) }}
                >
            Удалить
                </Button>
                <Button
                    theme={ThemeButton.SECONDARY}
                    onClick={handleCloseModal}
                >
            Отмена
                </Button>
            </Modal>
        </>
    )
}

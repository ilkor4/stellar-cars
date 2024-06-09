import { JSX, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form } from 'shared/ui/Form/ui/Form'
import { Input } from 'shared/ui/Input/Input'
import Select from 'react-select'
import { Loader } from 'shared/ui/Loader/Loader'
import { OptionsDataType, ProposalsInfoType } from 'entities/proposals/model/types'
import { useAppSelector } from 'app/store/hooks/redux'
import { transformToOptions } from 'entities/proposals/lib/transformToOptions'
import { proposalSchema } from 'shared/ui/Form/lib/utils/validations/schemes'
import { customStyles } from 'shared/ui/Form/lib/utils/select/selectStyles'
import { transformToProposalRequestData } from 'entities/proposals/lib/transformToProposalRequestData'
import { useSaveProposalMutation } from 'entities/proposals/services/proposalsService'
import { Navigate } from 'react-router-dom'
import { RoutePaths } from 'shared/config/routeConfig/routeConfig'
import { transformAutoCategoriesToOptions } from 'entities/proposals/lib/transformAutoCategoriesToOptions'
import cls from './NewProposalPage.module.scss'

/** Страница создания новой заявки. */
export default function NewProposalPage (): JSX.Element {
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
        resolver: yupResolver(proposalSchema)
    })
    /** Достаем нужные данные. */
    const [saveProposal, { isSuccess, error, isLoading }] = useSaveProposalMutation()
    const [activeModelsData, setActiveModelsData] = useState<OptionsDataType[]>([])
    const selectedAutoCategory = watch('autoCategory')
    const {
        citiesDictionary,
        autoCategoriesNamesDictionary,
        autoCategoriesDictionary,
        autoDictionary
    } = useAppSelector(state => state.dictionaryReducer)

    /**
     * Эффект, который исполнятся на каждое изменения состояния категории авто.
     * Если выбрана категория, то обнуляем модель
     * и изменяем активные модели для выбора.
     */
    useEffect(() => {
        if (selectedAutoCategory !== undefined) {
            const categoryId = autoCategoriesNamesDictionary[selectedAutoCategory.value]
            const modelsArr = autoDictionary[categoryId]

            setValue('model', { label: '', value: '' })
            setActiveModelsData(transformAutoCategoriesToOptions(modelsArr))
        }
    }, [selectedAutoCategory])

    /** Отправляет запрос на сохранения заявки в черновик. */
    const onSubmit: SubmitHandler<ProposalsInfoType> = async (proposalInfo: ProposalsInfoType) => {
        try {
            /** Трансформирует данные в формат запроса. */
            const proposalResponseData = transformToProposalRequestData(proposalInfo)

            await saveProposal(proposalResponseData).unwrap()
        } catch (err) {
            console.log(`Запрос выполнен с ошибкой: ${+err}`)
        }
        reset()
    }

    return (
        <main className={cls.page}>
            <Form
                className={cls.page__form}
                legend="Создать заявку"
                name="new-proposals"
                submitTitle="Сохранить"
                loading={isLoading}
                isValid={isValid}
                onSubmit={handleSubmit(onSubmit)}
            >
                <p className={cls.page__validation}>{errors.root?.message}</p>
                <Input
                    {...register('firstName')}
                    type="text"
                    placeholder="Имя"
                    isValid={errors.firstName?.message === undefined}
                />
                <p className={cls.page__validation}>{errors.firstName?.message}</p>
                <Input
                    {...register('lastName')}
                    type="text"
                    placeholder="Фамилия"
                    isValid={errors.lastName?.message === undefined}
                />
                <p className={cls.page__validation}>{errors.lastName?.message}</p>
                <Input
                    {...register('email')}
                    type="email"
                    placeholder="Email"
                    isValid={errors.email?.message === undefined}
                />
                <p className={cls.page__validation}>{errors.email?.message}</p>
                <Input
                    {...register('driverLicense')}
                    type="text"
                    placeholder="Водительское удостоверение"
                    isValid={errors.driverLicense?.message === undefined}
                />
                <p className={cls.page__validation}>{errors.driverLicense?.message}</p>
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
                <Controller
                    name="autoCategory"
                    control={control}
                    render={({ field }) =>
                        <Select
                            {...field}
                            styles={customStyles}
                            placeholder={'Выбирите марку автомобиля'}
                            options={transformToOptions(autoCategoriesDictionary)}
                        />}
                />
                <Controller
                    name="model"
                    control={control}
                    render={({ field }) =>
                        <Select
                            {...field}
                            styles={customStyles}
                            placeholder={'Выбирите модель автомобиля'}
                            options={activeModelsData}
                        />}
                />
                <p className={cls.page__validation}>{errors.model?.label?.message}</p>
                {/** Оператор отслеживающий состояние загрузки. */}
                {isLoading && <Loader className={cls.page__loader} />}
                {/** Оператор отслеживающий состояние ошибкиы. */
                    (error !== undefined) &&
                    <p className={cls.page__error}>Запрос выполнен с ошибкой: {+error}</p>
                }
                {/** Оператор отслеживающий состояние успешности запроса. */
                    isSuccess &&
                    <>
                        <p className={cls.page__success}>Завяка успешно создана!</p>
                        <Navigate to={RoutePaths.proposals} replace />
                    </>
                }
            </Form>
        </main>
    )
}

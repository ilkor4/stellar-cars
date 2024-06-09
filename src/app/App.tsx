import { FC, useEffect } from 'react'
import { Navbar } from 'widgets/Navbar'
import { AppRouter } from 'app/router'
import { useDispatch } from 'react-redux'
import { authSlice } from 'entities/auth/model/authSlice'
import { useAppSelector } from 'app/store/hooks/redux'
import { getTokenFromLocalStorage } from 'entities/auth/lib/token/getTokenFromLocalStorage'
import classNames from 'classnames'
import { useLazyGetUserQuery } from 'entities/User/services/userSevise'
import { categorizeDictionary } from 'entities/dictionary/lib/categorizeDictionary'
import { categorizeAutoDictionary } from 'entities/dictionary/lib/categorizeAutoDictionary'
import { dictionarySlice } from 'entities/dictionary/model/dictioanarySlice'
import { useLazyGetDictionaryQuery } from 'entities/dictionary/services/dictionaryService'
import { DictCodeType } from 'entities/dictionary/model/types'
import { PageLoader } from 'widgets/PageLoader'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { categorizeProposalsDictionary } from 'entities/proposals/lib/categorizeProposalsDictionary'
import { proposalsSlice } from 'entities/proposals/model/proposalsSlice'
import { useGetProposalsQuery } from 'entities/proposals/services/proposalsService'
import './styles/index.scss'

/** Главный компонент приложения, который хранит основную логику. */
export const App: FC = () => {
    const dispatch = useDispatch()
    const { theme } = useAppSelector(state => state.themeReducer)
    const { hasToken, isLogged } = useAppSelector(state => state.authReducer)
    const { statusesDictionary } = useAppSelector(state => state.dictionaryReducer)
    const [getUser] = useLazyGetUserQuery()
    const [getDictionary, { isLoading, error }] = useLazyGetDictionaryQuery()
    const { changeLoggedState, changeAuthCheckedState } = authSlice.actions
    const { changeProposalsDictionary, changeAllProposals } = proposalsSlice.actions
    /** Получаем данные заявок после авторизации и обновляем их каждые 3 минуты */
    const { data: proposalsData } = useGetProposalsQuery(null, {
        skip: !isLogged,
        pollingInterval: 300000
    })
    const {
        changeAutoDictionaryState,
        changeAutoCategoriesState,
        changeAutoCategoriesDictionaryState,
        changeAutoCategoriesNamesDictionaryState,
        changeAutoModelsDictionaryState,
        changeCitiesDictionaryState,
        changeStatusesDictionaryState
    } = dictionarySlice.actions
    /**
     * Эффект, который исполняется на каждое изменения состояния токена.
     * Если токен найден, и он не просрочен, получаем данные пользователя.
     * В противном случае изменяем состояние проверки авторизации на положительное.
     */
    useEffect(() => {
        const token: string | null = getTokenFromLocalStorage('access_token')

        if (token !== null) {
            getUser(null)
                .unwrap()
                .then(() => { dispatch(changeLoggedState(true)) })
                .catch((err) => { console.log(err) })
                .finally(() => dispatch(changeAuthCheckedState(true)))
        } else {
            dispatch(changeAuthCheckedState(true))
        }
    }, [hasToken])
    /**
     * Эффект, который исполняется на каждое изменения состояния (авторизован ли пользователь).
     * Если пользователь авторизован, запрашиваем данные всех словарей.
     * После успешного ответа, помещаем их в хранилище, разбивая на категории некоторые из них.
     */
    useEffect(() => {
        if (isLogged) {
            /** Создаем промисы из query запросов на получение данных словарей. */
            const autoPromise = getDictionary(DictCodeType.AUTO).unwrap()
            const autoCategoriesPromise = getDictionary(DictCodeType.AUTO_CATEGORIES).unwrap()
            const cityPromise = getDictionary(DictCodeType.CITIES).unwrap()
            const statusesPromise = getDictionary(DictCodeType.STATUSES).unwrap()

            /** Выполняем запросы. */
            Promise.all([
                autoPromise,
                autoCategoriesPromise,
                cityPromise,
                statusesPromise
            ])
                .then(([
                    autoData,
                    categoriesData,
                    cityData,
                    statusesData
                ]) => {
                    /** Разбиваем на категории данные по автомобилям. */
                    const [
                        autoDictionary,
                        autoCategories,
                        autoCategoriesDictionary,
                        autoCategoriesNamesDictionary
                    ] = categorizeAutoDictionary(autoData, categoriesData)

                    /** Размещаем полученные данные в хранилище. */
                    dispatch(changeAutoCategoriesState(autoCategories))
                    dispatch(changeAutoDictionaryState(autoDictionary))
                    dispatch(changeAutoCategoriesDictionaryState(autoCategoriesDictionary))
                    dispatch(changeAutoCategoriesNamesDictionaryState(autoCategoriesNamesDictionary))
                    dispatch(changeAutoModelsDictionaryState(categorizeDictionary(autoData)))
                    dispatch(changeCitiesDictionaryState(categorizeDictionary(cityData)))
                    dispatch(changeStatusesDictionaryState(categorizeDictionary(statusesData)))
                })
                .catch((err) => { console.log(err) })
        }
    }, [isLogged])
    /**
     * Эффект, который исполняется на каждое изменения состояния данных заявок и их статусов.
     * Если заявки и статусы проходят проверку,
     * Помещаем в хранилище все заявки и заявки, разбитые по значениям статусов.
     */
    useEffect(() => {
        if (proposalsData !== undefined && Object.keys(statusesDictionary).length > 0) {
            dispatch(changeAllProposals(proposalsData))
            dispatch(changeProposalsDictionary(
                categorizeProposalsDictionary(proposalsData, statusesDictionary))
            )
        }
    }, [proposalsData, statusesDictionary])

    return (
        <div className={classNames('app', theme)}>
            <Navbar />
            {
                /** Тернарный оператор отслеживающий состояние загрузки. */
                isLoading
                    ? <PageLoader/>
                    : <AppRouter />
            }
            {
                /** Оператор отслеживающий состояние ошибки. */
                error !== undefined &&
                <>
                    <p className={'app__error'}>
                        Возникла ошибка: {+error} Попробуйте обновить страницу.
                    </p>
                    <Button
                        theme={ThemeButton.PRIMARY}
                        onClick={() => { location.reload() }}
                    >
                        Обновить
                    </Button>
                </>
            }
        </div>
    )
}

import { FC, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { RoutePaths } from 'shared/config/routeConfig/routeConfig'
import { useAppSelector } from 'app/store/hooks/redux'
import { PageLoader } from 'widgets/PageLoader'

interface ProtectedRouteProps {
    /** элемент, который нужно отрисовать */
    element: ReactElement
    /** опциональный пропс - является ли страницей Входа. */
    isLoginPage?: boolean
}

/**
 * Компонент ProtectedRoute - это защищенный маршрут.
 */
export const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
    const { element, isLoginPage = false } = props
    const { isLogged, isAuthChecked } = useAppSelector(state => state.authReducer)

    /** Проверяет - не закончилась ли проверка авторизации. */
    if (!isAuthChecked) {
        return <PageLoader />
    }

    /** Проверяет - это не страница входа и пользовать не авторизирован. */
    if (!isLoginPage && !isLogged) {
        return <Navigate to={RoutePaths['sign-in']} />
    }

    /** Проверяет - это страница входа и пользовать авторизирован. */
    if (isLoginPage && isLogged) {
        return <Navigate replace to={RoutePaths.main } />
    }

    /**  Если все условия ложные, то возвращает элемент. */
    return element
}

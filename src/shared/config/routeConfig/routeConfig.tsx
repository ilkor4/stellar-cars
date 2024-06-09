import { RouteProps } from 'react-router-dom'
import { RegisterPage } from 'pages/RegisterPage'
import { LoginPage } from 'pages/LoginPage'
import { ProtectedRoute } from 'app/router'
import { UserPage } from 'pages/UserPage'
import { CatalogPage } from 'pages/CatalogPage'
import { ProposalsPage } from 'pages/ProposalsPage'
import { NewProposalPage } from 'pages/NewProposalPage'
import { ProposalPage } from 'pages/ProposalPage'

/** Перечисление названий роутов. */
export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'sign-in',
    REGISTER = 'sign-up',
    PROPOSALS = 'proposals',
    PROPOSAL = 'proposal',
    USER = 'user',
    NEW_PROPOSAL = 'new-proposal',
    NOTFOUND = 'not-found'
}

/** Объект маршрутов роутов. */
export const RoutePaths: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.LOGIN]: '/sign-in',
    [AppRoutes.REGISTER]: '/sign-up',
    [AppRoutes.USER]: '/user',
    [AppRoutes.NEW_PROPOSAL]: '/new-proposal',
    [AppRoutes.PROPOSALS]: '/proposals',
    [AppRoutes.PROPOSAL]: '/proposals/:id',
    [AppRoutes.NOTFOUND]: '*'
}

/** Объект конфигурации роутов. */
export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePaths.main,
        element: <ProtectedRoute element={<CatalogPage />} />
    },
    [AppRoutes.LOGIN]: {
        path: RoutePaths['sign-in'],
        element: <ProtectedRoute element={<LoginPage />} isLoginPage={true}/>
    },
    [AppRoutes.REGISTER]: {
        path: RoutePaths['sign-up'],
        element: <RegisterPage />
    },
    [AppRoutes.USER]: {
        path: RoutePaths.user,
        element: <ProtectedRoute element={<UserPage />} />
    },
    [AppRoutes.PROPOSALS]: {
        path: RoutePaths.proposals,
        element: <ProtectedRoute element={<ProposalsPage />} />
    },
    [AppRoutes.PROPOSAL]: {
        path: RoutePaths.proposal,
        element: <ProtectedRoute element={<ProposalPage />} />
    },
    [AppRoutes.NEW_PROPOSAL]: {
        path: RoutePaths['new-proposal'],
        element: <ProtectedRoute element={<NewProposalPage />} />
    },
    [AppRoutes.NOTFOUND]: {
        path: RoutePaths['not-found'],
        element: <ProtectedRoute element={<p className="app__not-found">Ничего не найдено</p>} />
    }
}

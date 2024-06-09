import { JSX, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { PageLoader } from 'widgets/PageLoader'

/**
 * Компонент AppRouter создает роуты из RouteConfig
 */
const AppRouter = (): JSX.Element => {
    return (
        <Suspense fallback={<PageLoader/>}>
            <Routes>
                {Object.values(routeConfig)
                    .map(({ path, element }) => (
                        <Route
                            key={path}
                            path={path}
                            element={element}
                        />
                    ))}
            </Routes>
        </Suspense>
    )
}
export default AppRouter

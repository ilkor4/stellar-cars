import { createRoot } from 'react-dom/client'
import { App } from 'app/App'
import { ErrorBoundary } from 'app/providers/ErrorBoundary'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { setupStore } from 'app/store/store'

const container = document.getElementById('root')

const root = createRoot(container as HTMLLIElement)

const store = setupStore()

root.render(
    <Provider store={store}>
        <ErrorBoundary>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ErrorBoundary>
    </Provider>
)

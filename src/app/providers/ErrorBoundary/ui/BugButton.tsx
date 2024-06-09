import { ReactNode, useEffect, useState } from 'react'
import { Button } from 'shared/ui/Button/Button'

/**
 * Компонент BugButton выбрасывaет исключение для тестирования обработки ошибок.
 */
export const BugButton = (): ReactNode => {
    const [error, setError] = useState(false)

    const onThrow = (): void => {
        setError(true)
    }

    useEffect(() => {
        if (error) {
            throw new Error()
        }
    }, [error])

    return (
        <Button onClick={onThrow}>
            throw
        </Button>
    )
}

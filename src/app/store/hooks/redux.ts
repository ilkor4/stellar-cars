import { AppDispatch, RootState } from 'app/store/store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

/** Кастомный хук, который типизирован под диспетчер приложения. */
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
/** Кастомный хук, который типизирован под типы корневого состояния. */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

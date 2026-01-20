import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import themeReducer from './slices/themeSlice'
import loadingReducer from './slices/loadingSlice'
import { authApiService, apiFeeService, merchantApiService } from './api/baseApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { errorMiddleware } from '@/middleware/errorMiddleware'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    loading: loadingReducer,
    [authApiService.reducerPath]: authApiService.reducer,
    [apiFeeService.reducerPath]: apiFeeService.reducer,
    [merchantApiService.reducerPath]: merchantApiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiService.middleware,
      apiFeeService.middleware,
      merchantApiService.middleware,
      errorMiddleware,
    ),
})
setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import { authApiService } from './api/baseApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApiService.reducerPath]: authApiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiService.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

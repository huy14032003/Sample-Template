import { authApiService } from '@/stores/api/baseApi'

export const authApi = authApiService.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
})

export const { useLoginMutation } = authApi

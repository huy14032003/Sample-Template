import { authApiService } from '@/stores/api/baseApi'
import { DashboardStats } from '../types/dashboard.types'

export const dashboardApi = authApiService.injectEndpoints({
    endpoints: (builder) => ({
        // Lấy thống kê dashboard
        getDashboardStats: builder.query<DashboardStats, void>({
            query: () => '/dashboard/stats',
            providesTags: ['Dashboard'],
        }),

        // Refresh thống kê
        refreshStats: builder.mutation<DashboardStats, void>({
            query: () => ({
                url: '/dashboard/stats/refresh',
                method: 'POST',
            }),
            invalidatesTags: ['Dashboard'],
        }),
    }),
})

export const {
    useGetDashboardStatsQuery,
    useRefreshStatsMutation
} = dashboardApi

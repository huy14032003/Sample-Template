import { useCallback, useMemo } from 'react'
import { useGetDashboardStatsQuery, useRefreshStatsMutation } from '../services/dashboard.api'
import { DashboardCard } from '../types/dashboard.types'

/**
 * Custom hook để quản lý dashboard logic
 * - Fetch stats từ API
 * - Format data thành cards
 * - Handle refresh
 */
export const useDashboard = () => {
    const { data: stats, isLoading, error, refetch } = useGetDashboardStatsQuery()
    const [refreshStats, { isLoading: isRefreshing }] = useRefreshStatsMutation()

    // Transform stats thành dashboard cards
    const dashboardCards: DashboardCard[] = useMemo(() => {
        if (!stats) return []

        return [
            {
                id: 'users',
                title: 'Tổng người dùng',
                value: stats.totalUsers,
                icon: '👥',
                color: '#1890ff'
            },
            {
                id: 'orders',
                title: 'Tổng đơn hàng',
                value: stats.totalOrders,
                icon: '📦',
                color: '#52c41a'
            },
            {
                id: 'revenue',
                title: 'Doanh thu',
                value: stats.totalRevenue,
                icon: '💰',
                color: '#faad14'
            },
            {
                id: 'active',
                title: 'Đang hoạt động',
                value: stats.activeUsers,
                icon: '🟢',
                color: '#722ed1'
            }
        ]
    }, [stats])

    // Handle refresh button
    const handleRefresh = useCallback(async () => {
        await refreshStats()
        refetch()
    }, [refreshStats, refetch])

    return {
        stats,
        dashboardCards,
        isLoading,
        isRefreshing,
        error: error ? 'Không thể tải dữ liệu' : null,
        handleRefresh
    }
}

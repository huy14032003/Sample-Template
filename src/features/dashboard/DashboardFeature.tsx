import React from 'react'
import { useDashboard } from './hooks/useDashboard'
import StatsCard from './components/StatsCard'

/**
 * DashboardFeature - Component chính của dashboard feature
 * Sử dụng useDashboard hook để lấy logic
 * Render StatsCard components
 */
const DashboardFeature: React.FC = () => {
    const {
        dashboardCards,
        isLoading,
        isRefreshing,
        error,
        handleRefresh
    } = useDashboard()

    if (isLoading) {
        return <div>Đang tải...</div>
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>
    }

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
            }}>
                <h2>Thống kê tổng quan</h2>
                <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: '#1890ff',
                        color: '#fff',
                        cursor: 'pointer'
                    }}
                >
                    {isRefreshing ? 'Đang refresh...' : '🔄 Refresh'}
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
            }}>
                {dashboardCards.map(card => (
                    <StatsCard key={card.id} card={card} />
                ))}
            </div>
        </div>
    )
}

export default DashboardFeature

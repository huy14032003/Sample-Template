import React from 'react'
import { DashboardCard as DashboardCardType } from '../types/dashboard.types'

interface StatsCardProps {
    card: DashboardCardType
}

/**
 * Component hiển thị 1 card thống kê
 * Đây là UI component riêng của dashboard feature
 */
const StatsCard: React.FC<StatsCardProps> = ({ card }) => {
    return (
        <div
            style={{
                padding: '24px',
                borderRadius: '12px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                minWidth: '200px'
            }}
        >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                {card.icon}
            </div>
            <div style={{ color: '#666', fontSize: '14px' }}>
                {card.title}
            </div>
            <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: card.color
            }}>
                {card.value.toLocaleString()}
            </div>
        </div>
    )
}

export default StatsCard

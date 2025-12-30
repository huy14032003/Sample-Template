// Dashboard Types

export interface DashboardStats {
    totalUsers: number;
    totalOrders: number;
    totalRevenue: number;
    activeUsers: number;
}

export interface DashboardCard {
    id: string;
    title: string;
    value: number;
    icon: string;
    color: string;
}

export interface DashboardState {
    stats: DashboardStats | null;
    isLoading: boolean;
    error: string | null;
}

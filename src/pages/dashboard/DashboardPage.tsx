import { Link } from "react-router-dom";
import { DashboardFeature } from "@/features/dashboard";

/**
 * DashboardPage - Route entry point
 * Chỉ chứa layout, import DashboardFeature từ features/
 */
const DashboardPage = () => {
    return (
        <div style={{ padding: "40px" }}>
            Chào mừng đến với dashboard
            <DashboardFeature />
            <div style={{ marginTop: "20px" }}>
                <Link to="/home" style={{ color: "#1890ff" }}>
                    Đi đến Home →
                </Link>
            </div>
        </div>
    );
};

export default DashboardPage;

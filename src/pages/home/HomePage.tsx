import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div style={{ padding: "40px", textAlign: "center" }}>
            <h1>Home Page</h1>
            <p>Chào mừng bạn đến với trang chủ!</p>
            <div style={{ marginTop: "20px" }}>
                <Link to="/dashboard" style={{ color: "#1890ff" }}>
                    Đi đến Dashboard →
                </Link>
            </div>
        </div>
    );
};

export default HomePage;

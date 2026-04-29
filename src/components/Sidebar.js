import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <>
            <div id="toast-container"></div>

            <aside className="sidebar" id="sidebar">
                <div className="sidebar-logo">
                <div className="logo-mark">Insighta<span>+</span></div>
                </div>

                <nav className="sidebar-nav">
                <div className="nav-section-label">Main</div>
                <Link to="/pages/dashboard.html">
                    <span className="nav-icon">⬡</span> Dashboard
                </Link>
                <Link to="/profiles">
                    <span className="nav-icon">◈</span> Profiles
                </Link>
                <Link to="/search">
                    <span className="nav-icon">◎</span> Search
                </Link>

                <div className="nav-section-label" style={{ marginTop:"8px" }}>Account</div>
                <Link to="/account">
                    <span className="nav-icon">○</span> My Account
                </Link>
                </nav>
            </aside>
        </>
    )
}
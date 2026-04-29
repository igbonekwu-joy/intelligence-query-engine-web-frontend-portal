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
                <a href="/pages/dashboard.html" className="${activeNav === 'dashboard' ? 'active' : ''}">
                    <span className="nav-icon">⬡</span> Dashboard
                </a>
                <Link to="/profiles" className="${activeNav === 'profiles' ? 'active' : ''}">
                    <span className="nav-icon">◈</span> Profiles
                </Link>
                <a href="/pages/search.html" className="${activeNav === 'search' ? 'active' : ''}">
                    <span className="nav-icon">◎</span> Search
                </a>

                <div className="nav-section-label" style={{ marginTop:"8px" }}>Account</div>
                <a href="/pages/account.html" className="${activeNav === 'account' ? 'active' : ''}">
                    <span className="nav-icon">○</span> My Account
                </a>
                </nav>

                <div className="sidebar-footer">
                <div className="user-chip" id="user-chip">
                    <div className="insighta-spinner" style={{ width:"24px", height:"24px", borderWidth:"1.5px", flexShrink:0  }}></div>
                    <div className="user-info">
                    <div className="user-name">Loading…</div>
                    <div className="user-role">—</div>
                    </div>
                </div>
                <button className="logout-btn" title="Logout" id="logout-btn" style={{ marginTop:"10px", width:"100%", textAlign:"left", padding:"6px 0", fontFamily:"var(--font-head)", fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--text-muted)"  }}>
                    ⎋ Sign out
                </button>
                </div>
            </aside>
        </>
    )
}
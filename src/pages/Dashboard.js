import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <Sidebar />

      <div className="main-content">
        <NavBar />

        <div className="page-body" id="page-body">
          <div className="mb-4" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
            <div>
              <div style={{ fontSize:"12px", color:"var(--text-muted)", marginBottom:"2px"  }}>Welcome back</div>
              <div style={{ fontFamily:"var(--font-head)", fontSize:"22px", fontWeight:"800"  }}>@{user?.username}</div>
            </div>
            {user?.role === "admin" ? `<button className="btn-insighta btn-primary-i" id="create-profile-btn">＋ New Profile</button>` : ""}
          </div>

        
          <div className="row g-3 mb-4" id="stat-cards">
            <div className="col-6 col-md-3">
              <div className="stat-card">
                <div className="stat-label">Total Profiles</div>
                <div className="stat-value" id="stat-total">—</div>
                <div className="stat-sub">all time</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-card green">
                <div className="stat-label">Male</div>
                <div className="stat-value" id="stat-male">—</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-card amber">
                <div className="stat-label">Female</div>
                <div className="stat-value" id="stat-female">—</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-card red">
                <div className="stat-label">Your Role</div>
                <div className="stat-value" style={{ fontSize:"20px" }}>{user?.role}</div>
                <div className="stat-sub">active</div>
              </div>
            </div>
          </div>

          <div className="card-dark">
            <div className="section-header">
              <span className="section-title">Recent Profiles</span>
              <a href="/pages/profiles.html" className="btn-insighta btn-ghost-i" style={{ fontSize:"12px" }}>View all →</a>
            </div>
            <div id="recent-table">
              <div className="loader-wrap">
                <div className="insighta-spinner"></div><span>Loading…</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
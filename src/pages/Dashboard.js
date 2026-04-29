import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [total, setTotal] = useState(1);
  const navigate = useNavigate();

  const handleCreateProfile = async () => {
    try {
      if (profileName.trim()) {
        console.log("Creating profile:", profileName);
        await api.post(`/api/profiles`, { name: profileName });
        
        setProfileName("");
        setShowModal(false);

        toast.success("Profile created successfully!");
      }
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  const fetchProfiles = async () => {
    try{
      const res = await api.get(`/api/profiles?&limit=50`);
      setTotal(res.data.total);
    }
    catch (e) {
      if(e.response.status === 400 || e.response.status === 401 || e.response.status === 403) {
        navigate("/login");
      }
      else{
        console.log(e);
      }
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

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
            {user?.role === "admin" && <button className="btn-insighta btn-primary-i" onClick={() => setShowModal(true)}>＋ New Profile</button>}
          </div>

        
          <div className="row g-3 mb-4" id="stat-cards">
            <div className="col-6 col-md-6">
              <div className="stat-card">
                <div className="stat-label">Total Profiles</div>
                <div className="stat-value" id="stat-total">{ total }</div>
                <div className="stat-sub">all time</div>
              </div>
            </div>
            <div className="col-6 col-md-6">
              <div className="stat-card red">
                <div className="stat-label">Your Role</div>
                <div className="stat-value" style={{ fontSize:"20px" }}>{user?.role}</div>
                <div className="stat-sub">active</div>
              </div>
            </div>
          </div>

          <div className="card-dark" style={{ marginTop: "30px" }}>
            <div className="section-header">
              <span className="section-title">All Profiles</span>
              <Link to="profiles" className="btn-insighta btn-ghost-i" style={{ fontSize:"12px" }}>View all →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Create Profile Modal */}
      {showModal && (
        <div style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: "rgba(0,0,0,0.5)", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "var(--bg-1)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "24px",
            maxWidth: "400px",
            width: "100%",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)"
          }}>
            <div style={{ fontSize: "18px", fontFamily: "var(--font-head)", fontWeight: "800", marginBottom: "16px" }}>Create New Profile</div>
            
            <input
              type="text"
              placeholder="Profile Name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleCreateProfile()}
              className="form-control-dark"
              style={{ marginBottom: "20px" }}
            />

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                onClick={() => {
                  setShowModal(false);
                  setProfileName("");
                }}
                className="btn-insighta btn-ghost-i"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProfile}
                className="btn-insighta btn-primary-i"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
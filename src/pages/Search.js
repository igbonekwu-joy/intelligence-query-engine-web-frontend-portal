import { useState } from "react";
import api from "../api/axios";
import { toast, Toaster } from "sonner";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const res = await api.get(`/api/profiles/search?q=${query}`);
      setResults(res.data.data);
    }
    catch (e) {
      if(e.response.status === 401) {
        navigate("/login");
      }
      else{
        console.log(e);
      }
    }
  };

  const deleteProfile = async (id) => {
    try {
      await api.delete(`/api/profiles/${id}`);
      toast.success("Profile deleted successfully!");


    }
    catch(e) {
      if(e.response.status === 401) {
        navigate("/login");
      }
      else{
        toast.error(e.response?.data?.message || "Failed to delete profile");
      }
    }
  };

  const isAdmin = user?.role === "admin";

  return (
    <div>
      <Toaster position="bottom-right" theme="dark" />
      <Sidebar />
      <div className="main-content">
        <NavBar />

        <div className="page-body" id="page-body">
          <div style={{ marginBottom:"20px" }}>
              <a href="/pages/profiles.html" className="btn-insighta btn-ghost-i" style={{ fontSize:"12px" }}>← Profiles</a>
          </div>
          <h2>Search</h2>
    
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search text"
            className="form-control-dark"
            style={{ marginBottom: "20px" }}
          />
          <button onClick={handleSearch} className="btn-insighta btn-ghost-i">Search</button>

          {results.map((p) => (
            <>
              <div className="profile-avatar-wrap mb-4 mt-4" style={{ marginTop: "10px" }}>
                <div style={{ flex: 1 }} className="mt-5">
                  <div style={{ fontFamily:"var(--font-head)",fontSize:'"',fontWeight:"800" }}>{p.name || "—"}</div>
                  <div style={{ display:"flex",gap:"8px",marginTop:"8px",flexWrap:"wrap "}}>
                    {p.gender} {p.age_group}
                    <span className="badge-insighta badge-default">{p.country_name || p.country_id || "—"}</span>
                  </div>
                </div>
                {isAdmin 
                ? 
                  <button 
                    className="btn-insighta btn-danger-i" 
                    id="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm("Are you sure you want to delete this profile?")) 
                        deleteProfile(p.id);
                    }}
                  >
                    Delete Profile
                  </button> 
                : 
                ""}
              </div>

              <div className="detail-grid mb-4">
                <div className="detail-item">
                  <div className="detail-key">Profile ID</div>
                  <div style={{ marginTop:"4px" }}><code className="id-chip" style={{ fontSize:"12px" }}>{p.id}</code></div>
                </div>
                <div className="detail-item">
                  <div className="detail-key">Full Name</div>
                  <div className="detail-val">{p.name || "—"}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-key">Gender</div>
                  <div className="detail-val" style={{ marginTop:"6px" }}>{p.gender}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-key">Gender Confidence</div>
                  <div style={{ marginTop: "8px" }}>{p.gender_probability}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-key">Estimated Age</div>
                  <div className="detail-val">{p.age ?? "—"}</div>
                  <div className="detail-sub">{p.age_group || ""}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-key">Age Group</div>
                  <div style={{ marginTop:"6px" }}>{p.age_group}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-key">Country</div>
                  <div className="detail-val">{p.country_name || "—"}</div>
                  <div className="detail-sub">ISO: {p.country_id || "—"}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-key">Country Confidence</div>
                  <div style={{ marginTop:"8px" }}>{p.country_probability}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-key">Created At</div>
                  <div className="detail-val" style={{ fontSize:"14px" }}>{p.created_at ? new Date(p.created_at).toLocaleString() : "—"}</div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
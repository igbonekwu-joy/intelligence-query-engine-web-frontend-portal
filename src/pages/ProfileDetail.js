import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";

export default function ProfileDetail() {
    const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [display, setDisplay] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/profiles/${id}`);
      setProfile(res.data.data);
    } catch (err) {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const genderBadge = (g) => {
    const cls = g === "male" ? "badge-male" : g === "female" ? "badge-female" : "badge-default";
    return cls;
  }

  const probBar = (val) => {
    const pct = Math.round((val || 0) * 100);
    return pct;
  }

  const initials = (profile?.name || "?").split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();

  useEffect(() => {
    fetchProfile();
  }, [id]);

  // 🔄 Loading state
  if (loading) {
    return <div style={{ padding: "20px" }}>Loading profile...</div>;
  }

  // ❌ Error state
  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <p>{error}</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  // ⚠️ No data
  if (!profile) {
    return <div style={{ padding: "20px" }}>No profile found</div>;
  }

  return (
    <>
        <Sidebar />
        <div className="main-content">
            <NavBar />
    
            <div className="page-body" id="page-body">
                <div style={{ marginBottom: "20px" }}>
                    <Link to="/profiles" className="btn-insighta btn-ghost-i" style={{ fontSize: "12px" }}>← Profiles</Link>
                </div>

                <div className="profile-avatar-wrap mb-4">
                    <div className="profile-avatar">{initials}</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "var(--font-head)", fontSize: "24px", fontWeight: "800" }}>{profile.name || "—"}</div>
                        <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
                            <span className="badge-insighta badge-default">{profile.gender}</span>
                            <span className="badge-insighta badge-default">{profile.age_group}</span>
                            <span className="badge-insighta badge-default">{profile.country_name || profile.country_id || "—"}</span>
                        </div>
                    </div>
                </div>

                <div className="detail-grid mb-4">
                    <div className="detail-item">
                        <div className="detail-key">Profile ID</div>
                        <div style={{ marginTop: "4px" }}><code className="id-chip" style={{ fontSize: "12px" }}>{profile.id}</code></div>
                    </div>
                    <div className="detail-item">
                        <div className="detail-key">Full Name</div>
                        <div className="detail-val">{profile.name || "—"}</div>
                    </div>
                    <div className="detail-item">
                        <div className="detail-key">Gender</div>
                        <div className="detail-val" style={{ marginTop: "6px" }}><span className={`badge-insighta ${genderBadge(profile.gender)}`}>{profile.gender}</span></div>
                    </div>
                    <div className="detail-item">
                        <div className="detail-key">Gender Confidence</div>
                        <div style={{ marginTop: "8px" }}>{probBar(profile.gender_probability)}%</div>
                    </div>
                    <div className="detail-item">
                        <div className="detail-key">Estimated Age</div>
                        <div className="detail-val">{profile.age ?? "—"}</div>
                        <div className="detail-sub">{profile.age_group || ""}</div>
                    </div>
                    <div className="detail-item">
                        <div className="detail-key">Age Group</div>
                        <div style={{ marginTop: "6px" }}>{profile.age_group}</div>
                    </div>
                    <div className="detail-item">
                        <div className="detail-key">Country</div>
                        <div className="detail-val">{profile.country_name || "—"}</div>
                        <div className="detail-sub">ISO: {profile.country_id || "—"}</div>
                    </div>
                    <div className="detail-item">
                        <div className="detail-key">Country Confidence</div>
                        <div style={{ marginTop: "8px" }}>{probBar(profile.country_probability)}%</div>
                    </div>
                    <div className="detail-item">
                        <div className="detail-key">Created At</div>
                        <div className="detail-val" style={{ fontSize: "14px" }}>{profile.created_at ? new Date(profile.created_at).toLocaleString() : "—"}</div>
                    </div>
                </div>

                <div className="card-dark">
                    <div className="section-header" style={{ cursor: "pointer" }}>
                        <span className="section-title">Raw Data</span>
                        <span 
                            style={{ color: "var(--text-muted)", fontSize: "12px" }}
                            onClick={() => setDisplay(!display)}
                        >
                            ▸ Expand
                        </span>
                    </div>
                    <div style={{ display: `${display ? "block" : "none"}` }}>
                        <pre style={{ fontSize: "11px", color: "var(--accent-2)", margin: "0", overflow: "auto" }}>{JSON.stringify(profile, null, 2)}</pre>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { UserPlus } from "lucide-react";

export default function Profiles() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchProfiles = async () => {
    try{
    const res = await api.get(`/api/profiles?page=${page}&limit=10`);
    setTotalPages(res.data.total_pages);
    setProfiles(res.data.data);
    }
    catch (e) {
      if(e.response.status === 400 || e.response.status === 401) {
        navigate("/login");
      }
      else{
        console.log(e);
      }
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [page]);

  function genderBadge(g) {
    const cls = g === "male" ? "badge-male" : g === "female" ? "badge-female" : "badge-default";
    return cls;
  }

  function probBar(val) {
    const pct = Math.round((val || 0) * 100);
    return pct;
  }

  const deleteProfile = async (id) => {
    try {
      await api.delete(`/api/profiles/${id}`);
      toast.success("Profile deleted successfully!");
      fetchProfiles();
    }
    catch(e) {
      if(e.response.status === 400 || e.response.status === 401) {
        navigate("/login");
      }
      else{
        toast.error(e.response?.data?.message || "Failed to delete profile");
      }
    }
  };

  return (
    <>
      <Toaster position="bottom-right" theme="dark" />
      <Sidebar />
        <div className="main-content">
          <NavBar />

          <div className="page-body" id="page-body">
            <h2>Profiles</h2>

            <div className="table-responsive">
              <table className="insighta-table" border="1">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Group</th>
                    <th>Country</th>
                    <th>Confidence</th>
                    <th>Created</th>
                    {user?.role === "admin" ? <th></th> : ''}
                  </tr>
                </thead>
                <tbody>
                  {profiles.map((p) => (
                    <tr 
                      onClick={() => navigate(`/profile/${p.id}`)} 
                      key={p.id}
                    >
                      <td>
                        <code className="id-chip">
                          {p.id.slice(0, 8)}
                        </code>
                      </td>
                      <td style={{ fontFamily:"var(--font-head)", fontWeight:"600"  }}>{p.name}</td>
                      <td>
                        <span className={`badge-insighta ${genderBadge(p.gender)}`}>{p.gender}</span>
                      </td>
                      <td style={{ color:"var(--text-muted)" }}>{p.age ?? "—"}</td>
                      <td>
                        <span className={`badge-insighta 'badge-default'}`}>{p.age_group}</span>
                      </td>
                      <td>{p.country_name || p.country_id || "—"}</td>
                      <td>
                        <div className="prob-bar">
                          <div className="prob-track"><div className="prob-fill" style={{ width:`${probBar(p.gender_probability)}%` }}></div></div>
                          <span className="prob-val">{probBar(p.gender_probability)}%</span>
                        </div>
                      </td>
                      <td className="mono">
                        {p.created_at ? new Date(p.created_at).toLocaleDateString() : "—"}
                      </td>
                      {user?.role === "admin" && (
                        <td>
                          <div style={{ display: "flex", gap: "6px" }}>
                            <button 
                              className="btn-insighta btn-danger-i" 
                              style={{ padding: "6px 10px", fontSize: "12px" }} 
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm("Are you sure you want to delete this profile?")) 
                                  deleteProfile(p.id);
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <nav style={{ marginTop: "32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
              <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                Page <span style={{ color: "var(--text)", fontWeight: "600" }}>{page}</span> of <span style={{ color: "var(--text)", fontWeight: "600" }}>{totalPages}</span>
              </div>
              <ul className="pagination justify-content-center" style={{ gap: "8px" }}>
                <li className="page-item">
                  <button className="page-link" disabled={page <= 1}  onClick={() => setPage(page - 1)} style={{ padding: "8px 16px", borderRadius: "6px" }}>← Prev</button>
                </li>
                <li className={`page-item ${page >= totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPage(page + 1)} style={{ padding: "8px 16px", borderRadius: "6px" }}>Next →</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
    </>
  );
}
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (p = 1) => {
    try {
      const res = await api.get(`/api/profiles/search?q=${query}&page=${p}&limit=10`);
      setResults(res.data.data);
      setTotalPages(res.data.total_pages);
      setPage(p);
      setSearched(true);
    } catch (e) {
      if (e.response?.status === 401) {
        navigate("/login");
      } else {
        console.log(e);
      }
    }
  };

  const handlePageChange = (newPage) => {
    handleSearch(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProfile = async (id) => {
    try {
      await api.delete(`/api/profiles/${id}`);
      toast.success("Profile deleted successfully!");
      handleSearch(page); // refresh current page after delete
    } catch (e) {
      if (e.response?.status === 401) {
        navigate("/login");
      } else {
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
          <div style={{ marginBottom: "20px" }}>
            <a href="/profiles" className="btn-insighta btn-ghost-i" style={{ fontSize: "12px" }}>← Profiles</a>
          </div>
          <h2>Search</h2>

          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(1)}
              type="text"
              placeholder="e.g. young males from Nigeria"
              className="form-control-dark"
              style={{ flex: 1 }}
            />
            <button onClick={() => handleSearch(1)} className="btn-insighta btn-ghost-i">Search</button>
          </div>

          {searched && results.length === 0 && (
            <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "48px 0" }}>
              No results found for "{query}".
            </div>
          )}

          {results.map((p) => (
            <div key={p.id}>
              <div className="profile-avatar-wrap mb-4 mt-4" style={{ marginTop: "10px" }}>
                <div style={{ flex: 1 }} className="mt-5">
                  <div style={{ fontFamily: "var(--font-head)", fontWeight: "800" }}>{p.name || "—"}</div>
                  <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
                    {p.gender} {p.age_group}
                    <span className="badge-insighta badge-default">{p.country_name || p.country_id || "—"}</span>
                  </div>
                </div>
                {isAdmin && (
                  <button
                    className="btn-insighta btn-danger-i"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm("Are you sure you want to delete this profile?"))
                        deleteProfile(p.id);
                    }}
                  >
                    Delete Profile
                  </button>
                )}
              </div>

              <div className="detail-grid mb-4">
                <div className="detail-item">
                  <div className="detail-key">Profile ID</div>
                  <div style={{ marginTop: "4px" }}><code className="id-chip" style={{ fontSize: "12px" }}>{p.id}</code></div>
                </div>
                <div className="detail-item">
                  <div className="detail-key">Full Name</div>
                  <div className="detail-val">{p.name || "—"}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-key">Gender</div>
                  <div className="detail-val" style={{ marginTop: "6px" }}>{p.gender}</div>
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
                  <div style={{ marginTop: "6px" }}>{p.age_group}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-key">Country</div>
                  <div className="detail-val">{p.country_name || "—"}</div>
                  <div className="detail-sub">ISO: {p.country_id || "—"}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-key">Country Confidence</div>
                  <div style={{ marginTop: "8px" }}>{p.country_probability}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-key">Created At</div>
                  <div className="detail-val" style={{ fontSize: "14px" }}>{p.created_at ? new Date(p.created_at).toLocaleString() : "—"}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {searched && totalPages > 1 && (
            <nav style={{ marginTop: "32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
              <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                Page <span style={{ color: "var(--text)", fontWeight: "600" }}>{page}</span> of{" "}
                <span style={{ color: "var(--text)", fontWeight: "600" }}>{totalPages}</span>
              </div>
              <ul className="pagination justify-content-center" style={{ gap: "8px" }}>
                <li className="page-item">
                  <button
                    className="page-link"
                    disabled={page <= 1}
                    onClick={() => handlePageChange(page - 1)}
                    style={{ padding: "8px 16px", borderRadius: "6px" }}
                  >
                    ← Prev
                  </button>
                </li>
                <li className={`page-item ${page >= totalPages ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    disabled={page >= totalPages}
                    onClick={() => handlePageChange(page + 1)}
                    style={{ padding: "8px 16px", borderRadius: "6px" }}
                  >
                    Next →
                  </button>
                </li>
              </ul>
            </nav>
          )}

        </div>
      </div>
    </div>
  );
}
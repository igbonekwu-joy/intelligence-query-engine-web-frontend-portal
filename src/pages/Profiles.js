import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

export default function Profiles() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // Filter state
  const [filters, setFilters] = useState({
    gender: "",
    country_id: "",
    age_group: "",
    min_age: "",
    max_age: "",
    sort_by: "",
    order: "asc",
  });

  // Temporary filter state (what's in the inputs before Apply is clicked)
  const [pendingFilters, setPendingFilters] = useState({ ...filters });

  const buildQuery = (f, p) => {
    const params = new URLSearchParams();
    params.set("page", p);
    params.set("limit", 10);
    if (f.gender)    params.set("gender", f.gender);
    if (f.country_id)   params.set("country_id", f.country_id);
    if (f.age_group) params.set("age_group", f.age_group);
    if (f.min_age)   params.set("min_age", f.min_age);
    if (f.max_age)   params.set("max_age", f.max_age);
    if (f.sort_by)   params.set("sort_by", f.sort_by);
    if (f.order)     params.set("order", f.order);
    return params.toString();
  };

  const fetchProfiles = useCallback(async () => {
    try {
      const res = await api.get(`/api/profiles?${buildQuery(filters, page)}`);
      setTotalPages(res.data.total_pages);
      setProfiles(res.data.data);
    } catch (e) {
      if (e.response?.status === 401) {
        navigate("/login");
      } else {
        console.log(e);
      }
    }
  }, [filters, page, navigate]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const handleApplyFilters = () => {
    setPage(1); // reset to page 1 on new filter
    setFilters({ ...pendingFilters });
  };

  const handleResetFilters = () => {
    const empty = {
      gender: "",
      country_id: "",
      age_group: "",
      min_age: "",
      max_age: "",
      sort_by: "",
      order: "asc",
    };
    setPendingFilters(empty);
    setFilters(empty);
    setPage(1);
  };

  const handlePendingChange = (e) => {
    setPendingFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function genderBadge(g) {
    return g === "male" ? "badge-male" : g === "female" ? "badge-female" : "badge-default";
  }

  function probBar(val) {
    return Math.round((val || 0) * 100);
  }

  const deleteProfile = async (id) => {
    try {
      await api.delete(`/api/profiles/${id}`);
      toast.success("Profile deleted successfully!");
      fetchProfiles();
    } catch (e) {
      if (e.response?.status === 401 || e.response?.status === 403) {
        navigate("/login");
      } else {
        toast.error(e.response?.data?.message || "Failed to delete profile");
      }
    }
  };

  const handleExport = async () => {
    try {
      const query = buildQuery(filters, 1);
      const response = await api.get(`/api/profiles/export?format=csv&${query}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `profiles_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Profiles exported successfully!");
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate("/login");
      } else {
        toast.error("Export failed.");
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

          {/* Filter Bar */}
          <div className="filter-bar" style={{ display: "flex", flexWrap: "wrap", gap: "10px", margin: "16px 0", alignItems: "flex-end" }}>
            
            {/* Gender */}
            <div className="filter-group">
              <label className="filter-label">Gender</label>
              <select name="gender" value={pendingFilters.gender} onChange={handlePendingChange} className="filter-input">
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Country */}
            <div className="filter-group">
              <label className="filter-label">Country Code</label>
              <input
                type="text"
                name="country_id"
                value={pendingFilters.country_id}
                onChange={handlePendingChange}
                placeholder="e.g. NG, US"
                className="filter-input"
                maxLength={2}
                style={{ textTransform: "uppercase", width: "90px" }}
              />
            </div>

            {/* Age Group */}
            <div className="filter-group">
              <label className="filter-label">Age Group</label>
              <select name="age_group" value={pendingFilters.age_group} onChange={handlePendingChange} className="filter-input">
                <option value="">All</option>
                <option value="child">Child</option>
                <option value="teenager">Teen</option>
                <option value="adult">Adult</option>
                <option value="senior">Senior</option>
              </select>
            </div>

            {/* Min Age */}
            <div className="filter-group">
              <label className="filter-label">Min Age</label>
              <input
                type="number"
                name="min_age"
                value={pendingFilters.min_age}
                onChange={handlePendingChange}
                placeholder="0"
                className="filter-input"
                min={0}
                style={{ width: "70px" }}
              />
            </div>

            {/* Max Age */}
            <div className="filter-group">
              <label className="filter-label">Max Age</label>
              <input
                type="number"
                name="max_age"
                value={pendingFilters.max_age}
                onChange={handlePendingChange}
                placeholder="100"
                className="filter-input"
                min={0}
                style={{ width: "70px" }}
              />
            </div>

            {/* Sort By */}
            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <select name="sort_by" value={pendingFilters.sort_by} onChange={handlePendingChange} className="filter-input">
                <option value="">Default</option>
                <option value="age">Age</option>
                <option value="name">Name</option>
                <option value="created_at">Created</option>
                <option value="country_id">Country</option>
              </select>
            </div>

            {/* Order */}
            <div className="filter-group">
              <label className="filter-label">Order</label>
              <select name="order" value={pendingFilters.order} onChange={handlePendingChange} className="filter-input">
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "8px" }}>
              <button className="btn-insighta btn-primary-i" onClick={handleApplyFilters}>
                Apply
              </button>
              <button className="btn-insighta btn-ghost-i" onClick={handleResetFilters}>
                Reset
              </button>
            </div>
          </div>

          {/* Export Button */}
          <button className="btn-insighta btn-ghost-i" onClick={handleExport}>
            Export CSV
          </button>

          <div className="table-responsive" style={{ marginTop: "16px" }}>
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
                  {user?.role === "admin" ? <th></th> : ""}
                </tr>
              </thead>
              <tbody>
                {profiles.length === 0 ? (
                  <tr>
                    <td colSpan={user?.role === "admin" ? 9 : 8} style={{ textAlign: "center", color: "var(--text-muted)", padding: "32px" }}>
                      No profiles found.
                    </td>
                  </tr>
                ) : (
                  profiles.map((p) => (
                    <tr onClick={() => navigate(`/profile/${p.id}`)} key={p.id}>
                      <td>
                        <code className="id-chip">{p.id.slice(0, 8)}</code>
                      </td>
                      <td style={{ fontFamily: "var(--font-head)", fontWeight: "600" }}>{p.name}</td>
                      <td>
                        <span className={`badge-insighta ${genderBadge(p.gender)}`}>{p.gender}</span>
                      </td>
                      <td style={{ color: "var(--text-muted)" }}>{p.age ?? "—"}</td>
                      <td>
                        <span className="badge-insighta badge-default">{p.age_group}</span>
                      </td>
                      <td>{p.country_name || p.country_id || "—"}</td>
                      <td>
                        <div className="prob-bar">
                          <div className="prob-track">
                            <div className="prob-fill" style={{ width: `${probBar(p.gender_probability)}%` }}></div>
                          </div>
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
                  ))
                )}
              </tbody>
            </table>
          </div>

          <nav style={{ marginTop: "32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Page <span style={{ color: "var(--text)", fontWeight: "600" }}>{page}</span> of{" "}
              <span style={{ color: "var(--text)", fontWeight: "600" }}>{totalPages}</span>
            </div>
            <ul className="pagination justify-content-center" style={{ gap: "8px" }}>
              <li className="page-item">
                <button className="page-link" disabled={page <= 1} onClick={() => setPage(page - 1)} style={{ padding: "8px 16px", borderRadius: "6px" }}>
                  ← Prev
                </button>
              </li>
              <li className={`page-item ${page >= totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(page + 1)} style={{ padding: "8px 16px", borderRadius: "6px" }}>
                  Next →
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
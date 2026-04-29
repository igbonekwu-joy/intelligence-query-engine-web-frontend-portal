import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ProfileDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h1>{profile.name}</h1>

      <div style={{ marginTop: "20px" }}>
        <p><strong>ID:</strong> {profile.id}</p>
        <p><strong>Gender:</strong> {profile.gender}</p>
        <p><strong>Gender Probability:</strong> {profile.gender_probability}</p>

        <p><strong>Age:</strong> {profile.age}</p>
        <p><strong>Age Group:</strong> {profile.age_group}</p>

        <p><strong>Country:</strong> {profile.country_name} ({profile.country_id})</p>
        <p><strong>Country Probability:</strong> {profile.country_probability}</p>

        <p><strong>Created At:</strong> {new Date(profile.created_at).toLocaleString()}</p>
      </div>
    </div>
  );
}
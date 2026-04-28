import api from "../api/axios";

export default function Account() {
  const logout = async () => {
    await api.post("/auth/logout");
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Account</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
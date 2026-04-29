import { Toaster } from "sonner";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";

export default function Account() {
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      window.location.href = "/login";
    }
    catch(e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Toaster position="bottom-right" theme="dark" />
      <Sidebar />
      <div className="main-content">
        <NavBar />

        <div className="page-body" id="page-body">
          <h2>Account</h2>
          <button onClick={logout} className="btn-insighta btn-ghost-i">Logout</button>
        </div>
      </div>
    </div>
  );
}
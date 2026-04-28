import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h2>Welcome, {user?.username}</h2>
      <p>Role: {user?.role}</p>
    </div>
  );
}
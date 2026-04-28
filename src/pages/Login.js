export default function Login() {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/github`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Insighta Labs+</h1>
      <button onClick={handleLogin}>
        Continue with GitHub
      </button>
    </div>
  );
}
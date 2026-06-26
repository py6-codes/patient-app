import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (email === "admin@gmail.com" && password === "1234") {
      setError("");
      onLogin();
      navigate("/encounters");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>🏥 MediCare</h1>

        <p className="login-subtitle">
          Welcome Back
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

      </div>

      <div className="login-image"></div>

    </div>
  );
}

export default Login;
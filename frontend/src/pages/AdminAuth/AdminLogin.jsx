import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../../assets/login-bg.png";
import "./AdminAuth.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Login failed");
      }

      localStorage.setItem("adminToken", resData.data.token);
      localStorage.setItem("adminUser", JSON.stringify(resData.data.user));

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth-page" style={{ backgroundImage: `url(${loginBg})` }}>
      <div className="admin-auth-overlay">
        <div className="admin-auth-box">
          <span className="admin-auth-badge">Admin Portal</span>
          <h1>Admin Login</h1>
          <p className="subtitle">Fashion Oasis Control Center</p>

          {error && <div className="admin-auth-error">⚠️ {error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Admin Email</label>
              <input
                type="email"
                placeholder="admin@fashionoasis.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="admin-auth-btn" disabled={loading}>
              {loading ? "Authenticating..." : "Login to Portal"}
            </button>
          </form>

          <p className="admin-auth-footer">
            Need an admin account? <Link to="/admin/register">Register Admin</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

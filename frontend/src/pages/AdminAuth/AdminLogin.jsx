import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FiFeather, FiAward, FiShield } from "react-icons/fi";
import loginAuth from "../../assets/login-auth.jpg";
import { adminLogin } from "../../api/admin";
import { notifySuccess, notifyError } from "../../utils/alerts";
import "./AdminAuth.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    setPasswordError("");
    setLoading(true);

    try {
      const resData = await adminLogin({ email, password });
      localStorage.setItem("adminToken", resData.data.token);
      localStorage.setItem("adminUser", JSON.stringify(resData.data.user));
      notifySuccess("Welcome, Administrator!");
      navigate("/admin/dashboard");
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || "Login failed";
      setError(errMsg);
      notifyError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        
        {/* ================= LEFT BRANDING PANEL ================= */}
        <div className="brand-panel">
          <img src={loginAuth} alt="Premium Luxury Jewellery" className="brand-panel-image" />
          <div className="brand-panel-overlay"></div>
          
          <div className="golden-light-glow"></div>

          <div className="gold-particles-container">
            <div className="gold-particle p1"></div>
            <div className="gold-particle p2"></div>
            <div className="gold-particle p3"></div>
            <div className="gold-particle p4"></div>
            <div className="gold-particle p5"></div>
            <div className="gold-particle p6"></div>
            <div className="gold-particle p7"></div>
            <div className="gold-particle p8"></div>
          </div>

          <div className="bottom-glass-card">
            <div className="glass-card-col">
              <span className="glass-card-icon"><FiFeather /></span>
              <span className="glass-card-text">Handmade</span>
            </div>
            <div className="glass-card-col">
              <span className="glass-card-icon"><FiAward /></span>
              <span className="glass-card-text">Premium Quality</span>
            </div>
            <div className="glass-card-col">
              <span className="glass-card-icon"><FiShield /></span>
              <span className="glass-card-text">Secure Shopping</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT FORM PANEL ================= */}
        <div className="login-box">
          <div className="login-form-wrapper">
            <div style={{ textAlign: "center", marginBottom: "15px" }}>
              <span className="admin-auth-badge">Admin Portal</span>
            </div>
            <h1 className="anim-fade-up-700" style={{ textAlign: "center" }}>Admin Login</h1>
            <p className="subtitle anim-fade-up-700" style={{ textAlign: "center", marginBottom: "24px" }}>
              Fashion Oasis Control Center
            </p>

            {error && <div className="admin-auth-error">⚠️ {error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="input-group anim-fade-up-input-1">
                <label htmlFor="email">Admin Email Address</label>
                <div className="input-wrapper">
                  <FaEnvelope className="input-icon" />
                  <input
                    id="email"
                    type="email"
                    placeholder="admin@fashionoasis.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group anim-fade-up-input-2">
                <label htmlFor="password">Password</label>
                <div className={`input-wrapper ${passwordError ? "input-error" : ""}`}>
                  <FaLock className="input-icon" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (e.target.value) setPasswordError("");
                    }}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {passwordError && <span className="password-error-msg">{passwordError}</span>}
              </div>

              <button type="submit" className="anim-fade-up-btn-500" disabled={loading} style={{ marginTop: "24px" }}>
                {loading ? "Authenticating..." : "Login to Portal"} <span className="arrow-icon">&rarr;</span>
              </button>
            </form>

            <p className="register anim-fade-up-register" style={{ marginTop: "24px", textAlign: "center" }}>
              Need an admin account?
              <Link to="/admin/register">
                Register Admin &rarr;
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;

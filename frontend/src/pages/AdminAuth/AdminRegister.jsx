import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaEnvelope, FaLock, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { FiFeather, FiAward, FiShield } from "react-icons/fi";
import loginAuth from "../../assets/login-auth.jpg";
import { validatePasswordStrength } from "../../utils/passwordValidation";
import { adminRegister } from "../../api/admin";
import { notifySuccess, notifyError } from "../../utils/alerts";
import "./AdminAuth.css";

const AdminRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (name.trim().length < 2) return "Name must be at least 2 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
    const passErr = validatePasswordStrength(password);
    if (passErr) {
      setPasswordError(passErr);
      return passErr;
    }
    setPasswordError("");
    if (!adminKey.trim()) return "Admin secret key is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const resData = await adminRegister({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        adminKey,
      });

      localStorage.setItem("adminToken", resData.data.token);
      localStorage.setItem("adminUser", JSON.stringify(resData.data.user));
      notifySuccess("Admin account created successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || "Registration failed.";
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
              <span className="admin-auth-badge">Admin Registration</span>
            </div>
            <h1 className="anim-fade-up-700" style={{ textAlign: "center" }}>New Admin</h1>
            <p className="subtitle anim-fade-up-700" style={{ textAlign: "center", marginBottom: "24px" }}>
              Create Store Management Credentials
            </p>

            {error && <div className="admin-auth-error">⚠️ {error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="input-group anim-fade-up-input-1">
                <label htmlFor="name">Full Name</label>
                <div className="input-wrapper">
                  <FaUserAlt className="input-icon" />
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Admin User"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group anim-fade-up-input-2">
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

              <div className="input-group anim-fade-up-input-3">
                <label htmlFor="password">Password</label>
                <div className={`input-wrapper ${passwordError ? "input-error" : ""}`}>
                  <FaLock className="input-icon" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password (e.g. Fashion@123)"
                    value={password}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPassword(val);
                      setPasswordError(validatePasswordStrength(val));
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

              <div className="input-group anim-fade-up-input-4">
                <label htmlFor="adminKey">Admin Secret Key</label>
                <div className="input-wrapper">
                  <FaKey className="input-icon" />
                  <input
                    id="adminKey"
                    type="password"
                    placeholder="Enter the secret key provided by your system"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="anim-fade-up-btn-500" disabled={loading} style={{ marginTop: "24px" }}>
                {loading ? "Registering..." : "Create Admin Account"} <span className="arrow-icon">&rarr;</span>
              </button>
            </form>

            <p className="register anim-fade-up-register" style={{ marginTop: "24px", textAlign: "center" }}>
              Already registered?
              <Link to="/admin/login">
                Login to Portal &rarr;
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminRegister;

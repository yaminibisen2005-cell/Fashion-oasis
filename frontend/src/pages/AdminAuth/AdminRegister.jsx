import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../../assets/login-bg.png";
import "./AdminAuth.css";
import { validatePasswordStrength } from "../../utils/passwordValidation";

const AdminRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
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
      const response = await fetch("http://localhost:5000/api/v1/auth/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), password, adminKey }),
      });

      const resData = await response.json();

      if (!response.ok) throw new Error(resData.message || "Registration failed.");

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
          <span className="admin-auth-badge">Admin Registration</span>
          <h1>New Admin</h1>
          <p className="subtitle">Create Store Management Credentials</p>

          {error && <div className="admin-auth-error">⚠️ {error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="e.g. Admin User"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Admin Email</label>
              <input
                type="email"
                placeholder="admin@fashionoasis.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create password (e.g. Fashion@123)"
                value={password}
                className={passwordError ? "input-error" : ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setPassword(val);
                  setPasswordError(validatePasswordStrength(val));
                }}
              />
              {passwordError && <span className="password-error-msg">{passwordError}</span>}
            </div>

            <div className="input-group">
              <label>Admin Secret Key</label>
              <input
                type="password"
                placeholder="Enter the secret key provided by your system"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
              />
            </div>

            <button type="submit" className="admin-auth-btn" disabled={loading}>
              {loading ? "Registering..." : "Create Admin Account"}
            </button>
          </form>

          <p className="admin-auth-footer">
            Already registered? <Link to="/admin/login">Login to Portal</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;

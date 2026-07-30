import "../Login/Login.css";
import loginBg from "../../assets/login-bg.png";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const ResetPassword = () => {
  const { token } = useParams(); // Grabs the token from the URL route
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`http://localhost:5000/api/v1/customer/reset-password/${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Token is invalid or has expired");
      }

      setMessage("Password updated successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="login-overlay">
        <div className="login-box">
          <h1>Reset Password 🔒</h1>
          <p className="subtitle">
            Enter your new secure password
          </p>

          {message && <p style={{ color: "green", marginBottom: "15px" }}>{message}</p>}
          {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

          <form onSubmit={handleResetPassword}>
            <div className="input-group">
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter new password (min 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>

          <p className="register">
            Remembered your password?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
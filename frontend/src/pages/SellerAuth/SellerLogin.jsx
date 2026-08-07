import "../Auth.css";
import loginAuth from "../../assets/login-auth.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaStore } from "react-icons/fa";
import { FiTrendingUp, FiUsers } from "react-icons/fi";

const SellerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const approvedSellers = JSON.parse(localStorage.getItem("approvedSellers") || "[]");
    if (!approvedSellers.some(s => s.email === "seller@gmail.com")) {
      approvedSellers.push({
        id: "seller_default",
        fullName: "Bimal Seller",
        storeName: "Fashion Oasis Store",
        email: "seller@gmail.com",
        password: "Bimal@gmail.com",
        phone: "9876543210",
        status: "approved"
      });
      localStorage.setItem("approvedSellers", JSON.stringify(approvedSellers));
    }

    if (location.state?.registrationSuccess) {
      setSuccessMessage(location.state.message || "Registration Submitted Successfully");
      // Clear the state after displaying
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    setPasswordError("");
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check if seller exists in pending registrations
      const pendingRegistrations = JSON.parse(localStorage.getItem("pendingSellerRegistrations") || "[]");
      const pendingSeller = pendingRegistrations.find(s => s.email === email);

      if (pendingSeller) {
        setErrorMessage("Your account is currently under review. Please wait for admin approval.");
        setLoading(false);
        return;
      }

      // Check if seller exists in approved sellers (simulated with localStorage)
      const approvedSellers = JSON.parse(localStorage.getItem("approvedSellers") || "[]");
      const approvedSeller = approvedSellers.find(s => s.email === email && s.password === password);

      if (!approvedSeller) {
        setErrorMessage("Invalid email or password.");
        setLoading(false);
        return;
      }

      // Create seller session
      const sellerSession = {
        id: approvedSeller.id,
        email: approvedSeller.email,
        fullName: approvedSeller.fullName,
        storeName: approvedSeller.storeName,
        status: approvedSeller.status,
        isLoggedIn: true,
        loginAt: new Date().toISOString()
      };

      // Store in localStorage
      localStorage.setItem("sellerSession", JSON.stringify(sellerSession));
      
      if (import.meta.env.DEV) {
        const existingToken = localStorage.getItem("sellerToken");
        if (!existingToken || existingToken.startsWith("dummy-")) {
          localStorage.setItem("sellerToken", "dummy-seller-token-12345");
        }
      }
      
      if (rememberMe) {
        localStorage.setItem("sellerRememberMe", "true");
      }

      console.log("Seller logged in:", sellerSession);
      navigate("/seller/dashboard");

    } catch (error) {
      setErrorMessage(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page seller-auth-theme">
      <div className="login-overlay">
        
        {/* ================= LEFT BRANDING PANEL ================= */}
        <div className="brand-panel">
          <img src={loginAuth} alt="Premium Luxury Jewellery" className="brand-panel-image" />
          <div className="brand-panel-overlay"></div>
          
          {/* Soft moving golden radial light */}
          <div className="golden-light-glow"></div>

          {/* Floating Gold Particles */}
          <div className="gold-particles-container">
            <div className="gold-particle p1"></div>
            <div className="gold-particle p2"></div>
            <div className="gold-particle p3"></div>
            <div className="gold-particle p4"></div>
            <div className="gold-particle p5"></div>
            <div className="gold-particle p6"></div>
            <div className="gold-particle p7"></div>
            <div className="gold-particle p8"></div>
            <div className="gold-particle p9"></div>
            <div className="gold-particle p10"></div>
            <div className="gold-particle p11"></div>
            <div className="gold-particle p12"></div>
          </div>

          {/* Floating Glass Feature Card at the bottom */}
          <div className="bottom-glass-card">
            <div className="glass-card-col">
              <span className="glass-card-icon"><FaStore /></span>
              <span className="glass-card-text">Store Management</span>
            </div>
            <div className="glass-card-col">
              <span className="glass-card-icon"><FiTrendingUp /></span>
              <span className="glass-card-text">Sales Analytics</span>
            </div>
            <div className="glass-card-col">
              <span className="glass-card-icon"><FiUsers /></span>
              <span className="glass-card-text">Customer Insights</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT FORM PANEL ================= */}
        <div className="login-box">
          <div className="login-form-wrapper">
            {successMessage && (
              <div className="success-banner">
                {successMessage}
                <p>Your account is under review. You can log in after admin approval.</p>
              </div>
            )}
            {errorMessage && (
              <div className="error-banner">
                {errorMessage}
              </div>
            )}
            <h1 className="anim-fade-up-700">Seller Portal</h1>
            <p className="subtitle anim-fade-up-700">
              Manage your jewellery business, products, orders and sales from one beautiful dashboard.
            </p>

            <form onSubmit={handleLogin}>
              <div className="input-group anim-fade-up-input-1">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <FaEnvelope className="input-icon" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your seller email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (e.target.value) setPasswordError("");
                    }}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    disabled={loading}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {passwordError && <span className="password-error-msg">{passwordError}</span>}

                <div className="form-options">
                  <label className="remember-me">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={loading}
                    />
                    <span>Remember me</span>
                  </label>
                  <Link to="/seller/forgot-password" className="forgot-link">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <button type="submit" className="anim-fade-up-btn-500" disabled={loading}>
                {loading ? (
                  <span className="spinner"></span>
                ) : (
                  <>
                    Login to Dashboard <span className="arrow-icon">&rarr;</span>
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider anim-fade-up-divider">
              <span></span>
              <p>OR</p>
              <span></span>
            </div>

            <p className="register anim-fade-up-register">
              New seller on Fashion Oasis?
              <Link to="/seller/register">
                Create seller account &rarr;
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SellerLogin;

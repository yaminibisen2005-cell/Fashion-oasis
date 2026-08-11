import "./Login.css";
import loginAuth from "../../assets/login-auth.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FiFeather, FiAward, FiShield } from "react-icons/fi";
import { customerLogin, googleAuth } from "../../api/customer";
import { auth, googleProvider, signInWithPopup } from "../../firebase";
import { notifySuccess, notifyError, notifyWarning } from "../../utils/alerts";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    setPasswordError("");

    try {
      const data = await customerLogin({ email, password });
      console.log("Login response data:", data);

      const token = data.token || data.data?.token;
      const userInfo = data.data || data.user || data;

      if (token) {
        localStorage.setItem("token", token);
      }
      if (userInfo) {
        localStorage.setItem("customerInfo", JSON.stringify(userInfo));
      }
      if (userInfo?.email || email) {
        localStorage.setItem("customerEmail", userInfo?.email || email);
      }

      window.dispatchEvent(new Event("storage"));

      notifySuccess("Login Successful!");
      
      // Extract target return URL if redirected from Checkout, Product Details, Wishlist, etc.
      // Default to Home page ("/") if no redirect target was provided
      const fromPath = location.state?.from?.pathname || location.state?.from;
      const redirectUrl = typeof fromPath === "string" ? fromPath : "/";

      navigate(redirectUrl, { replace: true });

    } catch (error) {
      console.error("Login error:", error);
      notifyError(error.response?.data?.message || error.message || "Invalid email or password");
    }
  };

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Google Login Handler
  const handleGoogleAuth = async () => {
    if (isGoogleLoading) return;
    setIsGoogleLoading(true);
    try {
      if (!auth || !googleProvider) {
        notifyWarning("Google Authentication is not configured or Firebase API keys are missing.");
        setIsGoogleLoading(false);
        return;
      }
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const data = await googleAuth({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        token: idToken
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("customerEmail", user.email);
        localStorage.setItem("customerInfo", JSON.stringify(data.data));

        window.dispatchEvent(new Event("storage"));
        notifySuccess("Logged in successfully with Google!");

        const fromPath = location.state?.from?.pathname || location.state?.from;
        const redirectUrl = typeof fromPath === "string" ? fromPath : "/";
        navigate(redirectUrl, { replace: true });
      }
    } catch (error) {
      console.error("Google Auth Error:", error);
      if (
        error.code === "auth/popup-closed-by-user" ||
        error.code === "auth/cancelled-popup-request"
      ) {
        // User closed or canceled popup - handle gracefully
      } else if (error.code === "auth/popup-blocked") {
        notifyWarning("Pop-up blocked by your browser. Please allow pop-ups for this website to sign in with Google.");
      } else if (error.code === "auth/unauthorized-domain") {
        notifyWarning("Domain not authorized for Google Sign-In. Please add this domain to Firebase Console Authorized Domains.");
      } else {
        notifyError(error.response?.data?.message || error.message || "Google sign-in failed. Please try again.");
      }
    } finally {
      setIsGoogleLoading(false);
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
            <div className="gold-particle p9"></div>
            <div className="gold-particle p10"></div>
            <div className="gold-particle p11"></div>
            <div className="gold-particle p12"></div>
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
            <h1 className="anim-fade-up-700">Welcome Back</h1>
            <p className="subtitle anim-fade-up-700">
              Sign in to continue your handcrafted jewellery journey.
            </p>

            <form onSubmit={handleLogin}>
              <div className="input-group anim-fade-up-input-1">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <FaEnvelope className="input-icon" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
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
                    placeholder="Enter your password"
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

                <Link to="/forgot-password" className="forgot-link">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="anim-fade-up-btn-500">
                Login <span className="arrow-icon">&rarr;</span>
              </button>
            </form>

            <div className="auth-divider anim-fade-up-divider">
              <span></span>
              <p>OR</p>
              <span></span>
            </div>

            <button type="button" className="google-btn anim-fade-up-btn-700" onClick={handleGoogleAuth}>
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
              />
              Continue with Google
            </button>

            <p className="register anim-fade-up-register">
              New to Fashion Oasis?
              <Link to="/register">
                Create your account &rarr;
              </Link>
            </p>

            <p className="register anim-fade-up-register" style={{ marginTop: "10px" }}>
              Are you a seller?
              <Link to="/seller/login">
                Access Seller Portal &rarr;
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
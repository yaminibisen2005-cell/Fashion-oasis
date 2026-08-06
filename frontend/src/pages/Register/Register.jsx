import "./Register.css";
import registerAuth from "../../assets/register-auth.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FiFeather, FiAward, FiShield } from "react-icons/fi";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setPasswordError("");

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/customer/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-page register-theme">
      <div className="login-overlay">
        
        {/* ================= LEFT BRANDING PANEL ================= */}
        <div className="brand-panel">
          <img src={registerAuth} alt="Premium Luxury Jewellery" className="brand-panel-image" />
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
              <span className="glass-card-icon"><FiAward /></span>
              <span className="glass-card-text">Certified Jewellery</span>
            </div>
            <div className="glass-card-col">
              <span className="glass-card-icon"><FiShield /></span>
              <span className="glass-card-text">Secure Payments</span>
            </div>
            <div className="glass-card-col">
              <span className="glass-card-icon"><FiFeather /></span>
              <span className="glass-card-text">Easy Returns</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT FORM PANEL ================= */}
        <div className="login-box">
          <div className="login-form-wrapper">
            <h1 className="anim-fade-up-700">Create Account</h1>
            <p className="subtitle anim-fade-up-700">
              Sign up to start your handcrafted jewellery journey.
            </p>
          
            <form onSubmit={handleRegister} noValidate>
              {/* First Name & Last Name */}
              <div className="row anim-fade-up-input-1">
                <div className="input-group">
                  <label htmlFor="firstName">First Name</label>
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <input
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="lastName">Last Name</label>
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="input-group anim-fade-up-input-2">
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

              {/* Password */}
              <div className="input-group anim-fade-up-input-2">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (e.target.value.length >= 6) setPasswordError("");
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
                {passwordError && <span style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{passwordError}</span>}
              </div>

              {/* Confirm Password */}
              <div className="input-group anim-fade-up-input-2">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button type="submit" className="anim-fade-up-btn-500">
                Register <span className="arrow-icon">&rarr;</span>
              </button>
            </form>

            <div className="auth-divider anim-fade-up-divider">
              <span></span>
              <p>OR</p>
              <span></span>
            </div>

            <button type="button" className="google-btn anim-fade-up-btn-700">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
              />
              Continue with Google
            </button>

            <p className="register anim-fade-up-register">
              Already have an account?
              <Link to="/login">
                Login &rarr;
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
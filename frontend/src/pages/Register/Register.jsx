 import "./Register.css";
import registerAuth from "../../assets/register-auth.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaEnvelope, FaPhoneAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FiFeather, FiAward, FiShield } from "react-icons/fi";
import { customerRegister } from "../../api/customer";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import { auth, googleProvider, signInWithPopup } from "../../firebase";
import axios from "axios";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPhoneError("");

    // Phone number validation
    if (!phoneNumber.trim()) {
      setPhoneError("Phone number is required");
      return;
    }
    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      setPhoneError("Please enter a valid 10-digit phone number");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await customerRegister({ 
        firstName, 
        lastName, 
        email, 
        phone: phoneNumber, 
        password, 
        confirmPassword 
      });

      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Something went wrong");
    }
  };

  // Google Login / Register Handler
  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

      const response = await axios.post(`${apiUrl}/customer/google`, {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        token: idToken
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("customerEmail", user.email);
        localStorage.setItem("customerInfo", JSON.stringify(response.data.data));

        alert("Google Authentication Successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Google Auth Error:", error);
      alert(error.response?.data?.message || "Google sign-in failed. Please try again.");
    }
  };

  const glassCardItems = [
    { icon: <FiAward />, text: "Certified Jewellery" },
    { icon: <FiShield />, text: "Secure Payments" },
    { icon: <FiFeather />, text: "Easy Returns" }
  ];

  return (
    <AuthLayout
      image={registerAuth}
      glassCardItems={glassCardItems}
      title="Create Account"
      subtitle="Sign up to start your handcrafted jewellery journey."
      themeClass="register-theme"
    >
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

        {/* Phone Number */}
        <div className="input-group anim-fade-up-input-2">
          <label htmlFor="phoneNumber">Phone Number</label>
          <div className="input-wrapper">
            <FaPhoneAlt className="input-icon" />
            <input
              id="phoneNumber"
              type="tel"
              placeholder="Enter 10-digit number"
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                if (value.length <= 10) {
                  setPhoneNumber(value);
                  if (value.length === 10) setPhoneError("");
                }
              }}
              required
            />
          </div>
          {phoneError && <span className="error-text">{phoneError}</span>}
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
          {passwordError && <span className="error-text">{passwordError}</span>}
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

      <button type="button" className="google-btn anim-fade-up-btn-700" onClick={handleGoogleAuth}>
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
    </AuthLayout>
  );
};

export default Register;
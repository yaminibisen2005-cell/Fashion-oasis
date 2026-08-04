import "./Register.css";
import loginBg from "../../assets/login-bg.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
    <div
      className="register-page"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="register-overlay">
        <main className="register-card">
          <h1>Create Account ✨</h1>

          <p className="register-subtitle">
            JOIN FASHION OASIS TODAY
          </p>

          <form className="register-form" onSubmit={handleRegister}>
            <div className="name-row">
              <div className="register-field">
                <label>First Name</label>
                <div className="field-control">
                  <FaUser />
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="register-field">
                <label>Last Name</label>
                <div className="field-control">
                  <FaUser />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="register-field">
              <label>Email Address</label>
              <div className="field-control">
                <FaEnvelope />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="register-field">
              <label>Password</label>
              <div className="field-control">
                <FaLock />
                <input
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (e.target.value.length >= 6) setPasswordError("");
                  }}
                  required
                />
              </div>

              {passwordError && (
                <small style={{ color: "red" }}>
                  {passwordError}
                </small>
              )}
            </div>

            <div className="register-field">
              <label>Confirm Password</label>
              <div className="field-control">
                <FaLock />
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="register-btn">
              Register
            </button>
          </form>

          <div className="register-divider">
            <span>OR</span>
          </div>

          <button type="button" className="fo-google-btn">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
            />
            Continue with Google
          </button>

          <p className="register-login-copy">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </main>
      </div>
    </div>
  );
};

export default Register;
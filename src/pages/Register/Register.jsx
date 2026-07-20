import "./Register.css";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="register-page">
      <div className="register-card">

        <h2>Create Account</h2>
        <p>Join us and start your journey</p>

        <form>

          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm your password"
            />
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="terms"
            />
            <label className="form-check-label" htmlFor="terms">
              I agree to the <a href="/terms">Terms & Conditions</a>
            </label>
          </div>

          <button type="submit" className="btn register-btn w-100">
            REGISTER
          </button>

        </form>

        <div className="divider">
          <span>Or register with</span>
        </div>

        <div className="social-icons">
          <button className="social-btn">
            <FaGoogle />
          </button>

          <button className="social-btn">
            <FaFacebookF />
          </button>

          <button className="social-btn">
            <FaApple />
          </button>
        </div>

        <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
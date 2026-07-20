import "./Login.css";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import { Link, Links } from "react-router-dom";

function Login() {
  return (
    <div className="login-page">
      <div className="login-card">

        <h2>Welcome Back!</h2>
        <p>Login to your account</p>

        <form>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />
          </div>

          <div className="text-end mb-3">
            <Link to="/reset-password" className="forgot-link">
  Forgot Password?
</Link>
          </div>

          <button type="submit" className="btn login-btn w-100">
            LOGIN
          </button>
        </form>

        <div className="divider">
          <span>Or login with</span>
        </div>

        <div className="social-icons">
          <button className="social-btn google">
            <FaGoogle />
          </button>

          <button className="social-btn facebook">
            <FaFacebookF />
          </button>

          <button className="social-btn apple">
            <FaApple />
          </button>
        </div>

        <p className="register-text">
          Don't have an account?{" "}
         <Link to="/register">rRegister</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
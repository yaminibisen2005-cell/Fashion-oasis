import "./ResetPassword.css";
import { Link } from "react-router-dom";

function ResetPassword() {
  return (
    <div className="reset-page">
      <div className="reset-card">

        <h2>Forgot Password?</h2>
        <p>
          Enter your email address and we'll send you a password reset link.
        </p>

        <form>
          <div className="mb-4">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>

          <button type="submit" className="btn reset-btn w-100">
            SEND RESET LINK
          </button>
        </form>

        <p className="back-login">
          Remember your password?{" "}
          <Link to="/login">Back to Login</Link>
        </p>

      </div>
    </div>
  );
}

export default ResetPassword;
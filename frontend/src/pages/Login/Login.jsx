import "./Login.css";
import loginBg from "../../assets/login-bg.png";
import { Link } from "react-router-dom";
const Login = () => {
  return (
 <div
  className="login-page"
  style={{ backgroundImage: `url(${loginBg})` }}
>
  <div className="login-overlay">
    <div className="login-box">

        <h1>
        Welcome Back ✨
        </h1>
        <p className="subtitle">
   Handcrafted Jewellery • Timeless Elegance
</p>

       

        <form>

          <div className="input-group">

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
            />

          </div>

<div className="input-group">

  <label>Password</label>

  <input
    type="password"
    placeholder="Enter your password"
  />

  <Link to="/forgot-password" className="forgot-link">
  Forgot Password?
</Link>

</div>

          <button>
            Login
          </button>

        </form>

        <p className="register">
          Don't have an account?{" "}
          <Link to="/register">
   Register
</Link>
        </p>
        <div className="divider">
  <span>OR</span>
</div>

<button className="google-btn">
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="Google"
  />
  Continue with Google
</button>

      </div>
    </div>
    </div>
  );
};

export default Login;
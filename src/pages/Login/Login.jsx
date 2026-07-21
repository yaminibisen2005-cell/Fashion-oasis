import "./Login.css";
import loginBg from "../../assets/login-bg.png";

const Login = () => {
  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="login-left">

        <div className="login-box">

          <h1>
            Welcome Back <span>✨</span>
          </h1>

          <p>
            Login to continue your journey <br />
            with Fashion Oasis.
          </p>

          <form>

            <div className="input-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="password-header">
              <label>Password</label>

              <a href="/">Forgot Password?</a>
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <button type="submit">
              Login
            </button>

          </form>

          <p className="register">
            Don't have an account?
            <a href="/"> Register</a>
          </p>

        </div>

      </div>

      {/* Right Section */}

      <div className="login-right">

        <img
          src={loginBg}
          alt="Fashion Oasis"
        />

      </div>

    </div>
  );
};

export default Login;
 import "./Login.css";
import loginBg from "../../assets/login-bg.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/v1/customer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      // Save the currently logged-in user's email to localStorage
      if (data.success && data.data && data.data.email) {
        localStorage.setItem("customerEmail", data.data.email);
      }

      alert("Login Successful!");
      console.log("LoggedIn user data:", data);

      // Redirect user to profile page after successful login
      navigate("/");

    } catch (error) {
      alert(error.message);
    }
  };

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

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>

            <button type="submit">
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
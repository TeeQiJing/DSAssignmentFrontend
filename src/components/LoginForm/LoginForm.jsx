import React from "react";
import "./LoginForm.css";
// import '../../RegisterLoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="login-form">
      <div className="wrapper">
        <form action="" autoComplete="false">
          <h1>Login</h1>
          <div className="input-box">
            <input type="email" placeholder="Email" required />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <FaLock className="icon" />
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot passttword?</a>
          </div>

          <button type="submit">Login</button>

          <div className="register-link"></div>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

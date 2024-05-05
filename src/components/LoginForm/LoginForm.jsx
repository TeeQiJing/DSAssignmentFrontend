import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/account/login?username=${username}&password=${password}`;
    if (username && password) {
      fetch(url).then(async (response) => {
        if (!response.ok) {
          alert("Login Failed! Please check your Username and Password Again!");

          return;
        }

        alert("Login Successfully!");

        navigate("/");

        console.log(response.json);

        return response.json();
      });

      setPassword("");
      setUsername("");
    }
  };
  return (
    <div className="wrapper">
      <form action="" autoComplete="false" onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>

        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit" name="login">
          Login
        </button>

        <div className="register-link"></div>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

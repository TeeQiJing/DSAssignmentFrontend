import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let userData = null;
  
      try {
        // Attempt to login as a regular user
        const response = await axios.get(`http://localhost:8080/account/login/${email}/${encodeURIComponent(password)}`);
        userData = response.data;
      } catch (error) {
        // If regular user login fails, attempt to login as an admin
        const adminResponse = await axios.get(`http://localhost:8080/account/loginadmin/${email}/${encodeURIComponent(password)}`);
        userData = adminResponse.data;
      }
  
      if (userData) {
        login(userData);
        alert("Login Successfully!");
       
        navigate(userData.account_type !== "Goblin" ?  "/dashboard" : "/admindashboard");
      } else {
        throw new Error("No user found");
      }
  
    } catch (error) {
      alert("Login Failed! Please check your Email and Password Again!");
    }
  };
  return (
    <div className="wrapper">
      <form action="" autoComplete="false" onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

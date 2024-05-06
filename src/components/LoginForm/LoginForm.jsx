import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { useSession } from "../../SessionContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { sessionData, setSessionData } = useSession();
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    login(email);
    navigate("/");
    // const url = `http://localhost:8080/account/login?email=${email}&password=${password}`;
    // if (email && password) {
    //   fetch(url).then(async (response) => {
    //     if (!response.ok) {
    //       alert("Login Failed! Please check your Email and Password Again!");

    //       return;
    //     }

    //     try {
    //       const response = await axios.get(`http://localhost:8080/account/getByEmail/${email}`);
    //       const userData = response.data;
    //       setSessionData(userData);
    //       console.log(userData.username);
    //       console.log(sessionData);
    //       // Redirect user to dashboard or perform other actions after successful login
    //     } catch (error) {
    //       console.error('Error logging in:', error);
    //     }

    //     alert("Login Successfully!");



    //     navigate("/");

    //     console.log(response.json);

    //     return response.json();
    //   });

      setPassword("");
      setEmail("");
    
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

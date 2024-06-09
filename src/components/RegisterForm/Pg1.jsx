import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./Pg1.css";


import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GiGoblinHead } from "react-icons/gi";
import './Pg1.css';
const Pg1 = ({ userData = {}, setUserData }) => {
  const steps = ["Personal Details", "Account Details", "Card Details"];
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/register/page2');
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Update the state with the new value if it matches the pattern
    if (/^\d*$/.test(value)) {
      setUserData({ ...userData, contact: value });
    }
  };

  const handleKeyPress = (e) => {
    // Prevent any keypress that is not a digit
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="pg1-wrapper">
      <form onSubmit={handleSubmit} autoComplete="true">
        <h1>Register</h1>
        <div className="stepper">
          <div className="line"></div>
          {steps?.map((step, i) => (
            <div
              key={i}
              className={`step ${
                i === 0
                  ? "first-circle"
                  : i === steps.length - 1
                  ? "last-circle"
                  : "normal-circle"
              }`}
            >
              <div className="circle">{("0" + (i + 1)).slice(-2)}</div>
              <p>{step}</p>
            </div>
          ))}
        </div>
        <p className="pp">Username</p>
        <div className="input-box1">
          <input
            type="text"
            placeholder="Exp: Bobby Lim"
            value={userData.username || ''}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            required
          />
        </div>

        <p className="pp">Date of Birth</p>
        <div className="input-box1">
          <input
            type="date"
            placeholder="Date"
            value={userData.dob || ''}
            onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
            required
          />
        </div>

        <p className="pp">Email</p>
        <div className="input-box1">
          <input
            type="email"
            placeholder="Exp: bobby123@gmail.com"
            value={userData.email || ''}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            required
          />
        </div>

        <p className="pp">Contact Number</p>
        <div className="input-box1">
          <input
          type="text"
          placeholder="Exp: 0123456789"
          value={userData.contact}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          pattern="\d*"
          title="Please enter only digits."
          required
        />
        </div>

        <p className="pp">Address</p>
        <div className="input-box1">
          <input
            type="text"
            placeholder="Exp: No.6 Jalan Merah, KL"
            value={userData.address || ''}
            onChange={(e) => setUserData({ ...userData, address: e.target.value })}
            required
          />
        </div>

        <GiGoblinHead className="Goblin" />

        <button type="submit" className="nextBtn1" >
          Next
        </button>

        <div className="Login-link">
          <p>
            Already have an account? <Link className="link" to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>

 
    
  );
};

export default Pg1;

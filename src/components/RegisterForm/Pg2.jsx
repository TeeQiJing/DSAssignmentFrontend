import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./Pg2.css";
import { GiGoblinHead } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";

const Pg2 = () => {
  const steps = ["Personal Details", "Acccount Details", "Card Details"];
  
  return (
    <div className="pg2-wrapper">
      <form action="">
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

        <p className="pp2">Acocount Number</p>
        <div className="input-box2">
          <input type="text" maxlength="20" placeholder="Enter your account number" required/>
        </div>
        
        
        <p className="pp2">Account Password</p>
        <div className="input-box2">
          <input type="password"  minlength="8" placeholder="Enter your password" required/>
        </div>

        <p className="pp2">Secure Phrase</p>
        <div className="input-box2">
          <input type="password" id="securePhrase" name="securePhrase" minlength="8" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" placeholder="Enter your secure phrase" required title="Your secure phrase must contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters."/>
        </div>
        
        <p className="pp2">Balance</p>
        <div className="input-box2">
        <input type="number" id="balance" name="balance" min="0" step="0.01" placeholder="Enter your balance" required/>
        </div>
        <GiGoblinHead className="Goblin"/>

        <button type="submit" className="PreviousBtn">
          Previous
        </button>

        <button type="submit" className="nextBtn2">
          Next
        </button>

        
      </form>
    </div>
  );
};

export default Pg2;

import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./Pg3.css";

import { FaRegUserCircle } from "react-icons/fa";

const Pg3 = () => {
  const steps = ["Personal Details", "Acccount Details", "Card Details"];
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardOptions] = useState([
    { value: "Credit Card", label: "Credit Card" },
    { value: "Debit Card", label: "Debit Card" },
    
    ]);
    const handleCardChange = (selectedOpt) => {
        setSelectedCard(selectedOpt);
      };
  return (
    <div className="pg3-wrapper">
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

        <p className="pp3">Card Number</p>
        <div className="input-box3">
            <input type="text" id="cardNumber" name="cardNumber" pattern="[0-9]{13,16}" maxlength="19" placeholder="Enter your card number" required/>
        </div>
        
        
        <p className="pp3">PIN Number</p>
        <div className="input-box3">
            <input type="password" id="cardPin" name="cardPin" pattern="[0-9]{4}" maxlength="6" placeholder="Enter your card PIN" required/>
        </div>
        
        <p className="pp3">Card Type</p>
        <div className="card">
          {/* <h3>Country:</h3> */}
          <Select
            className="selecttt"
            value={selectedCard}
            onChange={handleCardChange}
            options={cardOptions}
            placeholder="Select a type"
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999, // Ensure the dropdown menu appears above other elements
              }),
              control: (provided) => ({
                ...provided,
                backgroundColor: "transparent",
                border: "none", // Remove border
                boxShadow: "none", // Remove box shadow
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#fff", // Change text color
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "#0056b3" : "#fff", // Change background color
                color: "#000", // Change text color
              }),
              placeholder: (provided) => ({
                ...provided,
                color: "white", // Change placeholder color to white
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                color: "white", // Change dropdown arrow color to white
              }),
            }}
          />
        </div>

        <p className="ppCVV">CVV</p>
        <div className="input-box3CVV">
            <input type="text" id="cvv" name="cvv" pattern="[0-9]{3,4}" maxlength="4" placeholder="Enter your CVV" required/>
        </div>   

        <p className="ppED">Expiry Date</p>
        <div className="input-box3ED">
            <input type="text" id="expiryDate" name="expiryDate" pattern="(0[1-9]|1[0-2])\/[0-9]{2}" maxlength="5" placeholder="MM/YY" required/>
        </div>
        
        <button type="submit" className="PrevBtn">
          Previous
        </button>

        <button type="submit" className="FinishBtn">
          Finish
        </button>

        
      </form>
    </div>
  );
};

export default Pg3;

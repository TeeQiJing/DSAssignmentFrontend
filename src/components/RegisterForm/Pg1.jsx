import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./Pg1.css";


import { Link } from "react-router-dom";


const Pg1 = () => {
  const steps = ["Personal Details", "Acccount Details", "Card Details"];
  const [avatar, setAvatar] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryOptions] = useState([
    { value: "Malaysia", label: "Malaysia" },
    { value: "China", label: "China" },
    { value: "India", label: "India" },
    { value: "United States", label: "United States" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "Pakistan", label: "Pakistan" },
    { value: "Brazil", label: "Brazil" },
    { value: "Nigeria", label: "Nigeria" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "Russia", label: "Russia" },
    { value: "Mexico", label: "Mexico" },
    { value: "Japan", label: "Japan" },
    { value: "Ethiopia", label: "Ethiopia" },
    { value: "Philippines", label: "Philippines" },
    { value: "Egypt", label: "Egypt" },
    { value: "Vietnam", label: "Vietnam" },
    { value: "DR Congo", label: "DR Congo" },
    { value: "Turkey", label: "Turkey" },
    { value: "Iran", label: "Iran" },
    { value: "Germany", label: "Germany" },
    { value: "Thailand", label: "Thailand" },
  ]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  return (
    <div className='pg1-form'>
      <div className="pg1-wrapper">
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
        <p className="pp">Username</p>
        <div className="input-box1">
          <input type="text" placeholder="Exp: Bobby Lim" required />
        </div>

        <p className="pp">Date of Birth</p>
        <div className="input-box1">
          <input type="date" placeholder="Date" required />
        </div>

        <p className="pp">Email</p>
        <div className="input-box1">
          <input type="email" placeholder="Exp: bobby123@gmail.com" required />
        </div>

        <p className="pp">Contact Number</p>
        <div className="input-box1">
          <input type="tel" placeholder="Exp: 0123456789" required />
        </div>

        <p className="pp">Country</p>
        <div className="country">
          {/* <h3>Country:</h3> */}
          <Select
            className="selectt"
            value={selectedCountry}
            onChange={handleCountryChange}
            options={countryOptions}
            placeholder="Select a Country"
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

        <div className="avatar-box">
          <div className="user-avatar">
            <div className="avatar-wrapper">
              <img
                src={
                  avatar
                    ? avatar
                    : require("../../components/Assets/userIcon.png")
                }
                alt="Avatar"
                id="avatar-preview"
              />
            </div>
            <label htmlFor="avatar-input" className="avatar-label">
              Choose Avatar
            </label>
            <input
              type="file"
              id="avatar-input"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <button type="submit" className="nextBtn1">
          Next
        </button>

        <div className="Login-link">
          <p>
            Already have an account? <Link className="link" to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>

    </div>
    
  );
};

export default Pg1;

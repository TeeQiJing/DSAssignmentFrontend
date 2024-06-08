import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Pg2.css";
import axios from "axios";
import { useFileData } from "../../FileDataContext";

const Pg2 = ({ accountData = {}, setAccountData }) => {
  const steps = ["Personal Details", "Account Details", "Card Details"];
  const { setFileData } = useFileData();
  const [currencies, setCurrencies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/currencyConversion/unique-coins")
      .then(response => {
        setCurrencies(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the currencies!", error);
      });
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(file.size > 500*1024){
      alert('File size exceeds 500kb. Please choose a smaller file.');
      return;
    } else if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAccountData({ ...accountData, avatar: reader.result, file: file });
        setFileData(file);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please choose a file!');
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!accountData.file) {
      alert('Please choose a file!');
      return;
    }
    navigate("/register/page3",  { state: { file: accountData.file } });
  };

  return (
    <div className="pg2-wrapper">
      <form action="" autoComplete="true" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="stepper">
          <div className="line"></div>
          {steps.map((step, i) => (
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

        <p className="pp2">Account Number</p>
        <div className="input-box2">
          <input
            type="text"
            maxLength="20"
            placeholder="Enter your account number"
            value={accountData.accountNumber || ""}
            onChange={(e) =>
              setAccountData({ ...accountData, accountNumber: e.target.value })
            }
            required
          />
        </div>

        <p className="pp2">Account Password</p>
        <div className="input-box2">
          <input
            type="password"
            minLength="8"
            placeholder="Enter your password"
            value={accountData.password || ""}
            onChange={(e) =>
              setAccountData({ ...accountData, password: e.target.value })
            }
            required
          />
        </div>

        <p className="pp2">Secure Phrase</p>
        <div className="input-box2">
          <input
            type="password"
            id="securePhrase"
            name="securePhrase"
            minLength="8"
            value={accountData.securePhrase || ""}
            onChange={(e) =>
              setAccountData({ ...accountData, securePhrase: e.target.value })
            }
            // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            placeholder="Enter your secure phrase"
            required
            title="Your secure phrase must contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters."
          />
        </div>

        <p className="pp2">Balance</p>
        <div className="input-box2 balance-box">
          <input
          autoComplete="off"
            type="text"
            id="balance"
            name="balance"
            placeholder="Enter your balance"
            value={accountData.balance || ""}
            onChange={(e) =>
              setAccountData({ ...accountData, balance: e.target.value })
            }
            required
          />
          <select 
            value={accountData.currency || ""}
            onChange={(e) =>
              setAccountData({ ...accountData, currency: e.target.value })
            }
            required
            className="currency-select"
          >
            <option value="" disabled>Currency</option>
            {currencies.map((currency, index) => (
              <option key={index} value={currency}>{currency}</option>
            ))}
          </select>
        </div>

        <div className="avatar-box">
          <div className="user-avatar">
            <div className="avatar-wrapper">
              <img
                src={
                  accountData.avatar
                    ? accountData.avatar
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
              className="form-control"
              type="file"
              id="avatar-input"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="PreviousBtn"
          onClick={() => navigate("/register/page1")}
        >
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

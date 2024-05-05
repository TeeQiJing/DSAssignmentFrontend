import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Pg2.css";
import axios from "axios";
import { useFileData } from "../../FileDataContext";

const Pg2 = ({ accountData = {}, setAccountData }) => {
  const steps = ["Personal Details", "Acccount Details", "Card Details"];

  const { setFileData } = useFileData();
  // const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     setAccountData({ ...accountData, avatar: reader.result });
    //   };
    //   reader.readAsDataURL(file);
    // }
    // setAccountData({ ...accountData, file: file });
    // // setFile(file);
    // // setFile(e.target.files[0]);
    if(file.size > 500*1024){
      alert('File size exceeds 500kb. Please choose a smaller file.');
      return;
    }else if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAccountData({ ...accountData, avatar: reader.result, file: file }); // Include file data in accountData
        setFileData(file);
      };
      reader.readAsDataURL(file);
    }else{alert('Please choose a file!'); return;}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(accountData.file);
    if(!accountData.file)  {alert('Please choose a file!'); return;}
    navigate("/register/page3",  { state: { file: accountData.file } });
  };

  return (
    <div className="pg2-wrapper">
      <form action="" autoComplete="true" onSubmit={handleSubmit}>
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

        <p className="pp2">Account Number</p>
        <div className="input-box2">
          <input
            type="text"
            maxlength="20"
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
            minlength="8"
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
            minlength="8"
            value={accountData.securePhrase || ""}
            onChange={(e) =>
              setAccountData({ ...accountData, securePhrase: e.target.value })
            }
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            placeholder="Enter your secure phrase"
            required
            title="Your secure phrase must contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters."
          />
        </div>

        <p className="pp2">Balance</p>
        <div className="input-box2">
          <input
            type="number"
            id="balance"
            name="balance"
            min="0"
            step="0.01"
            placeholder="Enter your balance"
            value={accountData.balance || ""}
            onChange={(e) =>
              setAccountData({ ...accountData, balance: e.target.value })
            }
            required
          />
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
              // name="image"
              // aria-describedby="inputGroupFileAddon04"
              // aria-label="Upload"
              type="file"
              id="avatar-input"
              // name="avatarImg"
              // accept="image/*"
              accept="image/*"
              // value={accountData.avatar || null}
              onChange={handleFileChange}
              // required
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

    </div>
    
  );
};

export default Pg2;

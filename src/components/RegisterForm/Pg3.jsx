import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./Pg3.css";
import { useNavigate }from "react-router-dom";
import axios from "axios";
import { useFileData } from "../../FileDataContext";

const Pg3 = ({
  userData = {},
  accountData = {},
  cardData = {},
  setCardData,
  
}) => {
  const { fileData } = useFileData();
  // const [file, setFile] = useState(null); // State to store the file data

  // useEffect(() => {
  //   if (location.state && location.state.file) {
  //     setFile(location.state.file); // Retrieve file data from location state
  //   }
  // }, [location.state]);

  const navigate = useNavigate();
  const steps = ["Personal Details", "Acccount Details", "Card Details"];
  const [cardOptions] = useState([
    { value: "Credit Card", label: "Credit Card" },
    { value: "Debit Card", label: "Debit Card" },
  ]);
  const handleCardChange = (selectedOpt) => {
    setCardData({ ...cardData, cardType: selectedOpt });
  };

  // const register = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("accountNumber", accountData.accountNumber);
      // formData.append("address", userData.address);
      // formData.append("email", userData.email);
      // formData.append("dob", userData.dob);
      // formData.append("mobile", userData.contact);
      // formData.append("password", accountData.password);
      // formData.append("securePhrase", accountData.securePhrase);
      // formData.append("username", userData.username);
      // formData.append("balance", accountData.balance);
      // formData.append("image_path", accountData.file);
      // formData.append("cardNum", cardData.cardNum);
      // formData.append("cardType", cardData.casrdType);
      // formData.append("pin", cardData.pin);
      // formData.append("cvv", cardData.cvv);
      // formData.append("expiryDate", cardData.expiryDate);

      

  //     await axios.post("http://localhost:8080/addaccount", formData, {
  //       // params:{
  //       //   accountNumber: accountData.accountNumber,
  //       //   address: userData.address,
  //       //   email: userData.email,
  //       //   dob: userData.dob,
  //       //   mobile: userData.contact,
  //       //   password: userData.password,
  //       //   username: userData.username,
  //       //   balance: userData.balance

  //       // },
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     alert("Image uploaded successfully!");
  //   } catch (error) {
  //     console.log(userData);
  //     console.log(cardData);
  //     console.log(accountData);
  //     // console.error("Error uploading image:", error);
  //     // alert("Error uploading image. Please try again later.");
  //   }
  // };

  const register = async (e) => {
    e.preventDefault();

    const accountPayload = {
      account_number: accountData.accountNumber,
      username: userData.username,
      password: accountData.password,
      dob: userData.dob,
      address: userData.address,
      mobile: userData.contact,
      email: userData.email,
      secure_phrase: accountData.securePhrase,
      balance: accountData.balance,
      // user_avatar: {
      //   image_path: null // You can modify this to include the file/avatar data if needed
      // },
      user_avatar: null,
      // card: {
      //   card_num: cardData.cardNum,
      //   card_type: cardData.cardType,
      //   card_pin: cardData.pin,
      //   cvv: cardData.cvv,
      //   expiry_date: cardData.expiryDate
      // }
      card: null,
    };

    const card = {
        account_number: accountData.accountNumber,
        card_num: cardData.cardNum,
        card_type: cardData.cardType.value,
        card_pin: cardData.pin,
        cvv: cardData.cvv,
        expiry_date: cardData.expiryDate
    }

    // const user_avatar = {
    //   account_number: accountData.accountNumber,
    //   image_path: file,
    // }

    try {
      console.log(accountPayload);
      const response = await axios.post('http://localhost:8080/account/addaccount', JSON.stringify(accountPayload), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data); // Handle response if needed
    } catch (error) {
      alert('Account Registered Failed! The Account Number, Card Number, Email, Contact Number and Username must be Unique!' );
      // navigate("/login");
      return;
    }

    try {
      console.log(card);
      const response = await axios.post('http://localhost:8080/card/add', JSON.stringify(card), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data); // Handle response if needed
      console.log(fileData);
      const formData = new FormData();
      formData.append('accountNumber', accountData.accountNumber);
      formData.append('image_path', fileData);
  
      try {
        await axios.post('http://localhost:8080/uploadimage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Account Registered Successfully Please Check Your Email to get the Verification Token!');


        try {

          
          var userInput = prompt('Please enter 6 characters verification tokens (Case Sensitive): ');

          const resp = await axios.get(`http://localhost:8080/account/gettoken/${accountPayload.account_number}`);
          const confirmationToken = resp.data.confirmationToken;
  
          while(userInput != confirmationToken || userInput==null){
            alert('Verification token Incorrect! Please Try Again!');
            userInput = prompt('Please enter 6 characters verification tokens (Case Sensitive): ');
          }
  
          if(userInput==confirmationToken){
            alert('Your email has been verified, and will be redirect to Login Page');
            const response = await axios.get(`http://localhost:8080/account/verify/${confirmationToken}`);
            console.log(response);
            navigate("/login");
            
          }
        } catch (error) {
          console.error("Error :", error);
        }

        // var userInput = prompt('Please enter 6 characters verification tokens (Case Sensitive): ');
  



      } catch (error) {
        alert('Image Upload Failed !');
      }


      
    } catch (error) {
        alert('Card Number already exists, Please try a new one!');
    }

    // User Avatar Upload

    

    // while(userInput == null || userInput=='') {
    //   alert('Verification token entered is Empty!');
    //   userInput = prompt('Please enter 6 characters verification tokens (Case Sensitive): ');
    // }

    

  


      
    
   

  };
  return (
    <div className="pg3-wrapper">
      <form action="" autoComplete="true" onSubmit={register}>
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
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={cardData.cardNum || ""}
            onChange={(e) =>
              setCardData({ ...cardData, cardNum: e.target.value })
            }
            pattern="[0-9]{13,16}"
            maxlength="19"
            placeholder="Enter your card number"
            required
          />
        </div>

        <p className="pp3">PIN Number</p>
        <div className="input-box3">
          <input
            type="password"
            id="cardPin"
            name="cardPin"
            pattern="[0-9]{6}"
            maxlength="6"
            minLength="6"
            value={cardData.pin || ""}
            onChange={(e) => setCardData({ ...cardData, pin: e.target.value })}
            placeholder="Enter your card PIN"
            required
          />
        </div>

        <p className="pp3">Card Type</p>
        <div className="card">
          {/* <h3>Country:</h3> */}
          <Select
            className="selecttt"
            value={cardData.cardType}
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
          <input
            type="text"
            id="cvv"
            name="cvv"
            pattern="[0-9]{3}"
            maxlength="3"
            value={cardData.cvv || ""}
            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
            placeholder="Enter your CVV"
            required
          />
        </div>

        <p className="ppED">Expiry Date</p>
        <div className="input-box3ED">
          <input
            type="text"
            id="expiryDate"
            value={cardData.expiryDate || ""}
            onChange={(e) =>
              setCardData({ ...cardData, expiryDate: e.target.value })
            }
            name="expiryDate"
            pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
            maxlength="5"
            placeholder="MM/YY"
            required
          />
        </div>

        <button
          type="submit"
          className="PrevBtn"
          onClick={() => navigate("/register/page2")}
        >
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

import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./AddContact.css";
import axios from "axios";
import { useAuth } from "../../AuthProvider";

const AddContact = ({ onFinish }) => {
  const { userData } = useAuth();
  const [nickName, setNickName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");


  const navigate = useNavigate();

  const handleFinish = async () => {
    // Validate the fields
    if (!nickName || nickName.trim() === "") {
      alert("Please enter a nickname.");
      return;
    }
    if (!phoneNumber || phoneNumber.trim() === "") {
      alert("Please enter a phone number.");
      return;
    }
    if (!accountNumber || accountNumber.trim() === "") {
      alert("Please enter an account number.");
      return;
    }

    const contactList= {
      user_created_name: nickName,
      account_number: accountNumber,
      contact_mobile: phoneNumber
    };

    
     
    // Add the contact to the contact list database
    // Replace this with your logic to add the contact
    // console.log(
    //   `Adding contact: ${nickName}, ${phoneNumber}, ${accountNumber}`
    // );

    
    axios.post(`http://localhost:8080/ContactList/${userData.username}/${userData.account_number}/${userData.mobile}/add`, contactList)
    .then(response => {
      // Handle successful response
      console.log(response.data); // You can access response data here if needed
      console.log("Successfully Add");
      navigate("/transaction/transfer", { state: { accountNumber } });
    })
    .catch(error => {
      // Handle errors
      if (error.response && error.response.data) {
        const errorMessage = error.response.data;
  
        if (errorMessage === "Cannot Add Yourself In Contact List!" || accountNumber===userData.account_number || phoneNumber === userData.mobile) {
          alert("Cannot Add Yourself In Contact List!");
        } else if (errorMessage === "This Account is Already in Your Contact List, Please Try Another Account") {
          alert("This Account is Already in Your Contact List, Please Try Another Account!");
        } else {
          // Handle other unexpected error messages
          alert("This User is Not Yet Registered. Please Try Another Account!");
        }
      } else {
        // Handle cases where there is no response or error response is not as expected
        alert("An unexpected error occurred. Please try again later.");
      }
    });

    
    // Redirect to Transfer.jsx after adding the contact
   


  };

  return (
    <div className="WrapperAddContact">
      <Box>
        <h2 className="AddContactText">Add Contact</h2>
        
          <TextField className="NickNameField"
            label="NickName"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <TextField className="PhoneNumField"
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            variant="outlined"
            fullWidth
            autoComplete="off"
          />
          <TextField className="AccNumField"
            label="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            variant="outlined"
            fullWidth
            autoComplete="off"
          />
          <Box mt={2} className="ButtonFinish">

            <Button variant="contained" color="primary" onClick={handleFinish}>
              Finish
            </Button>
          </Box>
        
      </Box>
    </div>
  );
};

export default AddContact;

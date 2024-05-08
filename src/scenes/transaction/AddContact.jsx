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

    
    axios.post(`http://localhost:8080/ContactList/${userData.username}/add`, contactList)
  .then(response => {
    // Handle successful response
    console.log(response.data); // You can access response data here if needed
    console.log("Successfully Add")
    navigate("/transaction/transfer",  { state: { accountNumber } })
  })
  .catch(error => {
    // Handle errors
    if (error.response.status === 502 ) {
      alert("The User is already Exist in Your Contact List");
    } else {
      // Handle other errors
      alert("The User is not yet Registered");
      // You can show a generic error message or handle it as per your requirement
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
            fullWidth
          />
          <TextField className="PhoneNumField"
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField className="AccNumField"
            label="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            variant="outlined"
            fullWidth
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

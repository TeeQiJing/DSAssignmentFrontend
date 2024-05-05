import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./AddContact.css";

const AddContact = ({ onFinish }) => {
  const [nickName, setNickName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const navigate = useNavigate();

  const handleFinish = () => {
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
    // Add the contact to the contact list database
    // Replace this with your logic to add the contact
    console.log(
      `Adding contact: ${nickName}, ${phoneNumber}, ${accountNumber}`
    );
    // Redirect to Transfer.jsx after adding the contact
    onFinish();
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

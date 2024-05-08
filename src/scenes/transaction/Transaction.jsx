import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import Header from "../../components/Header";
import "./Transaction.css";
import { useAuth } from "../../AuthProvider";
import axios from "axios";
import GetUserAvatar from "../../GetUserAvatar";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const Transaction = () => {
  const { userData } = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const [contactList, setContactList] = useState([]);
  const [filteredContactList, setFilteredContactList] = useState([]);
  const [searching, setSearching] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  // const history = useHistory();

  // Fetch all contacts when searchValue is empty or changes
  useEffect(() => {
    const fetchAllContacts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/ContactList/${userData.username}`
        );
        setContactList(response.data);
        
      } catch (error) {
        console.error("Error fetching all contacts:", error);
       
      }
    };

    if (searchValue.trim() === "" || searching) {
      setUserNotFound(false);
      fetchAllContacts();
    }
  }, [userData.username, searchValue, searching]);

  // Fetch filtered contacts based on searchValue
  useEffect(() => {
    const fetchFilteredContacts = async () => {
      if (searchValue.trim() !== "") {
        try {
          const response = await axios.get(
            `http://localhost:8080/ContactList/${userData.username}/${searchValue}`
          );
          setFilteredContactList(response.data);
          setUserNotFound(response.data.length === 0);
        } catch (error) {
          console.error("Error fetching filtered contacts:", error);
          
        }
      }
    };

    fetchFilteredContacts();
  }, [userData.username, searchValue]);

  const handleSearchOnChange = (e) => {
    setSearchValue(e.target.value);
    setSearching(true);
    if (!e.target.value) {
      setSearching(false);
    }
  };

  // Handle click event on "Add Contact" button
  const handleAddContactClick = () => {
    // Navigate to the AddContact page
    // Replace '/addContact' with the actual path of your AddContact page
    window.location.href = "/transaction/addContact";
  };

  return (
    <Box m="20px">
      <Header title="Transaction" subtitle="Welcome to your transaction" />
      <Box mt={2}>
        <TextField
          fullWidth
          label="Enter Account Number, Nickname, or Phone Number"
          variant="outlined"
          value={searchValue}
          onChange={handleSearchOnChange}
        />
      </Box>

      <Box mt={2}>
        <Header subtitle="Contact List" />
        {userNotFound ? ( // Display message if user not found
          <Box variant="body1" color="error" className="userNotFoundMessage">
            The user is not in your contact list.{" "}
            <Button className="userNotFoundMessageButton"
              variant="outlined"
              // color="blue"
              onClick={handleAddContactClick}
            >
              Add Contact
            </Button>
          </Box>
        ) : searching ? (
          filteredContactList.map((contact, index) => (
            <ContactItem key={index} contact={contact} />
          ))
        ) : (
          <div
            className="UserBoxContainerr"
            style={{ maxHeight: "470px", overflowY: "auto" }}
          >
            {contactList.map((contact, index) => (
              <ContactItem key={index} contact={contact} />
            ))}
          </div>
        )}
      </Box>
    </Box>
  );
};

const ContactItem = ({ contact }) => {
  const navigate = useNavigate();

  const handleTransferClick = (accountNumber) => {
    navigate("/transaction/transfer", { state: { accountNumber } }); // Pass state with navigate
  };

  return (
    <Box className="userBoxContainer">
      <Box className="userBox">
        <div className="avatar">
          <GetUserAvatar accountNumber={contact.account_number} />
        </div>
        <div className="userName">Name: {contact.user_created_name}</div>
        <div className="phoneNumber">
          Phone Number: {contact.contact_mobile}
        </div>

        <div className="accountNumber">
          Account Number: {contact.account_number}
        </div>
        <div className="TransferBox">
          <Button
            className="transferButton"
            variant="contained"
            color="primary"
            onClick={() => handleTransferClick(contact.account_number)}
          >
            Transfer
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default Transaction;

import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import Header from "../../components/Header";
import "./Transaction.css";
import { useAuth } from "../../AuthProvider";
import axios from "axios";
import GetUserAvatar from "../../GetUserAvatar";

const Transaction = () => {
  const { userData } = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const [contactList, setContactList] = useState([]);
  const [filteredContactList, setFilteredContactList] = useState([]);
  const [searching, setSearching] = useState(false);

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
        <Button variant="contained" color="primary">
          Search
        </Button>
      </Box>
      <Box mt={2}>
        <Header subtitle="Contact List" />
        {searching ? (
          filteredContactList.map((contact, index) => (
            <ContactItem key={index} contact={contact} />
          ))
        ) : (
          contactList.map((contact, index) => (
            <ContactItem key={index} contact={contact} />
          ))
        )}
      </Box>
    </Box>
  );
};

const ContactItem = ({ contact }) => {
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
      </Box>
    </Box>
  );
};

export default Transaction;

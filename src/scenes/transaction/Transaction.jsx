import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import Header from "../../components/Header";
import "./Transaction.css";
import AddContact from "./AddContact"; // Import the AddContact component
import { useNavigate } from "react-router-dom";

const Transaction = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const navigate = useNavigate();
  // Demo data for recent user searches
  const recentSearches = [
    {
      userName: "John Doe",
      phoneNumber: "123456789",
      accountNumber: "123456789",
    },
    {
      userName: "Jane Smith",
      phoneNumber: "987654321",
      accountNumber: "987654321",
    },
    // Add more recent searches here...
  ];

  const existsInDatabase = (value) => {
    // // Simulated database check
    // const database = recentSearches.concat([.../* Other database data */]);
    // return database.some(user => Object.values(user).includes(value));
  };

  const handleSearch = () => {
    // Simulated search logic, replace with actual logic to check if the search value exists in the database
    const existsInDatabase = true; // Replace with actual check

    if (existsInDatabase) {
      // Check if the user is in the contact list
      const isInContactList = false; // Replace with actual check

      if (isInContactList) {
        setSearchResult("UserExistsInContactList");
      } else {
        setSearchResult("UserExistsInDatabaseButNotContactList");
      }
    } else {
      setSearchResult("UserNotFound");
    }
  };

  const handleAddContact = () => {
    // Logic to add the user to the contact list
    console.log("Adding user to contact list...");
    navigate("/transaction/addContact");
  };

  const handleBack = () => {
    setSearchResult(null); // Reset search result
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
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Box>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Box mt={2}>
        <Header subtitle="Contact List" />
        {searchValue === "" &&
          recentSearches.map((user, index) => (
            <Box className="userBoxContainer">
             
                <Box key={index} className="userBox">
                  <div className="avatar">
                    <img src={user.avatarUrl} alt="Avatar" />
                  </div>
                  <div className="userName">Name: {user.userName}</div>
                  <div className="phoneNumber">
                    Phone Number: {user.phoneNumber}
                  </div>
                  <div className="accountNumber">
                    Account Number: {user.accountNumber}
                  </div>
                </Box>
           
            </Box>
          ))}
        {searchResult === "UserExistsInContactList" && (
          <Box>The user exists in your contact list.</Box>
        )}
        {searchResult === "UserExistsInDatabaseButNotContactList" && (
          <Box>
            The user exists in the database but not in your contact list.
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddContact}
            >
              Add Contact
            </Button>
          </Box>
        )}
        {searchResult === "UserNotFound" && (
          <Box>The searched user does not exist.</Box>
        )}
      </Box>
    </Box>
  );
};

export default Transaction;

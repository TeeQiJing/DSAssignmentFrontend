import React, { useState, useEffect } from "react";
import { Box, Button, Avatar, Select, MenuItem } from "@mui/material";
import { useLocation } from "react-router-dom";
import { BiTransfer } from "react-icons/bi";

import "./Transfer.css";

const Transfer = () => {
  const [senderAccountNumber, setSenderAccountNumber] = useState("");
  const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
  const [transferAmount, setTransferAmount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [reference, setReference] = useState("");
  const [dailyLimit, setDailyLimit] = useState(0);
  const [currencyType, setCurrencyType] = useState("Knut");
  const [demoNames, setDemoNames] = useState(["John Doe", "Jane Smith"]); // Sample names
  const location = useLocation(); // Get location using useLocation hook

  useEffect(() => {
    // Simulate data retrieval from the database
    // In a real application, you would fetch data from the backend

    // Extract query parameters from location
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get("type");
    const value = searchParams.get("value");

    // Simulated data based on search parameters
    // In a real application, this would be fetched from the backend
    // Simulated sender's account number (replace with actual logic)
    const senderAccountNum = "1234567890";

    // Simulated receiver's account number based on search value (replace with actual logic)
    const receiverAccountNum = value === "123" ? "9876543210" : "9998887776";
    // Simulated daily limit based on sender's account type (replace with actual logic)
    const senderAccountType = "silver"; // Example account type
    const dailyLimits = {
      silver: 5000,
      gold: 10000,
      platinum: 15000,
    };
    const senderDailyLimit = dailyLimits[senderAccountType];

    // Set state values based on simulated data
    setSenderAccountNumber(senderAccountNum);
    setReceiverAccountNumber(receiverAccountNum);
    setDailyLimit(senderDailyLimit);
  }, [location.search]); // useEffect dependency on location.search to re-run when search changes

  const handleTransfer = () => {
    // Simulate transfer process
    console.log(
      `Transferring ${transferAmount} to account ${receiverAccountNumber} with category ${selectedCategory}`
    );
  };

  // const conversionRates = {
  //   Knut: { Knut: 1, Sickle: 29, Galleon: 493 },
  //   Sickle: { Knut: 0.03448, Sickle: 1, Galleon: 17 },
  //   Galleon: { Knut: 0.002028, Sickle: 0.05882, Galleon: 1 }
  // };

  const calculateTotalInKnut = (amount, currencyType) => {
    // Define the conversion rates
    const conversionRates = {
      Knut: { Knut: 1, Sickle: 29, Galleon: 493 },
      Sickle: { Knut: 0.03448, Sickle: 1, Galleon: 17 },
      Galleon: { Knut: 0.002028, Sickle: 0.05882, Galleon: 1 },
    };

    // Convert the amount to a number
    amount = Number(amount);

    // Check if the currency type is valid
    if (!conversionRates[currencyType]) {
      console.error(`Invalid currency type: ${currencyType}`);
      return "N/A";
    }

    // Get the conversion rate for the selected currency type
    const conversionRate = conversionRates[currencyType]["Knut"];

    // Calculate the total amount in Knuts
    const totalAmount = (amount * conversionRate).toFixed(2);

    return totalAmount;
  };

  return (
    <div className="WrapperTransfer">
      <Box m="20px">
        <h1>Transfer</h1> {/* Greeting message */}
        <div className="InnerWrapperTransfer">
          {/* Display sender's avatar */}
          <Avatar className="Avatar1" src="sender-avatar.jpg" />
          {/* Display receiver's avatar */}
          <Avatar className="Avatar2" src="receiver-avatar.jpg" />
          <div className="transferIcon">
            <BiTransfer />
          </div>
          <Box>
            <h2 className="TransferFromText">Transfer From </h2>
            <h2 className="TransferToText">Transfer To </h2>
            <div className="NameText">Name : </div>
            <div className="SendName">
              {demoNames[0]} {/* Display the first demo name */}
            </div>
            <div className="ReceiveName">
              {demoNames[1]} {/* Display the second demo name */}
            </div>
            <div className="AccountNumText">Account Number : </div>

            <div className="SendAccNum">{senderAccountNumber}</div>
            <div className="ReceiveAccNum">{receiverAccountNumber}</div>
          </Box>
          <Box mt={2}>
            <div className="AmountText">
              Amount : <br />
              (Daily limit RM{dailyLimit})
            </div>

            <input
              className="AmountSpace"
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <div>
              <Select
                className="CurrencySelector"
                value={currencyType}
                onChange={(e) => setCurrencyType(e.target.value)}
              >
                <MenuItem value="Knut">Knut</MenuItem>
                <MenuItem value="Sickle">Sickle</MenuItem>
                <MenuItem value="Galleon">Galleon</MenuItem>
              </Select>
            </div>
            <div className="TotalAmount">
              Total Amount (in Knuts) :{" "}
              <span className="AmountValue">
                {calculateTotalInKnut(transferAmount, currencyType)}
              </span>
            </div>
          </Box>
          <Box mt={2}>
            <div className="CategoryText">Category :</div>
            <select
              className="CategorySelect"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="Game">Game</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Grocery">Grocery</option>
              <option value="Business">Business</option>
            </select>
          </Box>
          <Box mt={2}>
            <div className="ReferenceText">Reference :</div>
            <input
              type="text"
              className="ReferenceInput"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <Button
              className="TransferButton"
              variant="contained"
              color="primary"
              onClick={handleTransfer}
            >
              Transfer
            </Button>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default Transfer;

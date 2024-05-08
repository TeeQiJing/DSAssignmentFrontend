import React, { useState, useEffect } from "react";
import { Box, Button, Select, MenuItem } from "@mui/material";
import { useLocation } from "react-router-dom";
import { BiTransfer } from "react-icons/bi";
import axios from "axios";

import { useAuth } from "../../AuthProvider";
import GetUserAvatar from "../../GetUserAvatar";
import "./Transfer.css";

const Transfer = () => {
  const { userData } = useAuth();
  const [senderAccountNumber, setSenderAccountNumber] = useState("");
  const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
  const [receiverUsername, setReceiverUsername] = useState("");
  const [senderUsername, setSenderUsername] = useState("");
  const [transferAmount, setTransferAmount] = useState(0);
  const [senderCurrencyType, setSenderCurrencyType] = useState("Knut");
  const [receiverCurrencyType, setReceiverCurrencyType] = useState("Knut");
  const [dailyLimit, setDailyLimit] = useState(0);
  const [reference, setReference] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const location = useLocation();
  const accountNumber = location.state ? location.state.accountNumber : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/account/${accountNumber}`
        );
        const data = response.data;
        setReceiverUsername(data.username);
      } catch (error) {
        console.error("Error :", error);
      }
    };

    fetchData();

    const senderAccountType = "silver";
    const dailyLimits = {
      silver: 5000,
      gold: 10000,
      platinum: 15000,
    };
    const senderDailyLimit = dailyLimits[senderAccountType];

    // Set state values based on simulated data
    setSenderAccountNumber(userData.account_number);
    setReceiverAccountNumber(accountNumber);
    setSenderUsername(userData.username);
    setDailyLimit(senderDailyLimit);
  }, [accountNumber, userData.username]);

  const handleTransfer = () => {
    // Simulate transfer process
    console.log(
      `Transferring ${transferAmount} ${senderCurrencyType} to account ${receiverAccountNumber} with category ${selectedCategory}`
    );
  };

  const calculateTotalAmountWithFee = () => {
    const currencies = {
      Knut: { Knut: 1, Sickle: 29, Galleon: 493 },
      Sickle: { Knut: 0.03448, Sickle: 1, Galleon: 17 },
      Galleon: { Knut: 0.002028, Sickle: 0.05882, Galleon: 1 },
    };

    const senderConversionRate =
      currencies[senderCurrencyType][receiverCurrencyType];
    const totalAmount = transferAmount * senderConversionRate;

    return totalAmount.toFixed(2);
  };

  const calculateServiceFee = () => {
    const serviceRates = {
      Knut: { Sickle: 0.01, Galleon: 0.02 },
      Sickle: { Knut: 0.03, Galleon: 0.04 },
      Galleon: { Knut: 0.05, Sickle: 0.06 },
    };

    const serviceFee =
      serviceRates[senderCurrencyType]?.[receiverCurrencyType] *
        transferAmount || 0;
    return serviceFee.toFixed(2);
  };

  const calculateTotalAmountWithServiceFee = () => {
    const totalAmount =
      parseFloat(transferAmount) + parseFloat(calculateServiceFee());
    return totalAmount.toFixed(2);
  };

  return (
    <div className="WrapperTransfer">
      <Box m="20px">
        <h1>Transfer</h1> {/* Greeting message */}
        
        <div className="InnerWrapperTransfer">
          {/* Display sender's avatar */}
          <div className="avatar" style={{ transform: 'translateX(172px) translateY(7px)' }}>
          <GetUserAvatar accountNumber={senderAccountNumber} />
        </div>
          {/* Display receiver's avatar */}
          <div className="avatar" style={{ transform: 'translateX(504px) translateY(-112px)' }}>
          <GetUserAvatar accountNumber={receiverAccountNumber} />
        </div>
          <div className="transferIcon">
            <BiTransfer />
          </div>
          {/* <Box> */}
            <h2 className="TransferFromText">Transfer From </h2>
            <h2 className="TransferToText">Transfer To </h2>
            <div className="NameText">Name : </div>
            <div className="SendName">
              {/* {demoNames[0]} Display the first demo name */}
              {senderUsername}
            </div>
            <div className="ReceiveName">
              {/* {demoNames[1]} Display the second demo name */}
              {receiverUsername}
            </div>
            <div className="AccountNumText">Account Number : </div>

            <div className="SendAccNum">{senderAccountNumber}</div>
            <div className="ReceiveAccNum">{receiverAccountNumber}</div>
          {/* </Box>
          <Box mt={2}> */}
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
          {/* </Box>
          <Box mt={2}> */}
            <div>
              <Select
                className="CurrencySelector1"
                value={senderCurrencyType}
                onChange={(e) => setSenderCurrencyType(e.target.value)}
              >
                <MenuItem value="Knut">Knut</MenuItem>
                <MenuItem value="Sickle">Sickle</MenuItem>
                <MenuItem value="Galleon">Galleon</MenuItem>
              </Select>
            </div>
            <div>
              <Select
                className="CurrencySelector2"
                value={receiverCurrencyType}
                onChange={(e) => setReceiverCurrencyType(e.target.value)}
              >
                <MenuItem value="Knut">Knut</MenuItem>
                <MenuItem value="Sickle">Sickle</MenuItem>
                <MenuItem value="Galleon">Galleon</MenuItem>
              </Select>
            </div>
            <div className="TotalAmount">
              Total Amount :
              {
                "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"
              }
              <span className="AmountValue">
                {transferAmount} {senderCurrencyType} ={" "}
                {calculateTotalAmountWithFee()} {receiverCurrencyType}
              </span>
            </div>
            <div className="ServiceFee">
              Service Fee :
              {
                "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"
              }
              <span className="FeeValue">
                {isNaN(parseFloat(calculateServiceFee()))
                  ? 0
                  : calculateServiceFee()}{" "}
                {senderCurrencyType}
              </span>
            </div>
            <div className="TotalAmountWithFee">
              Total Amount :
              {
                "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"
              }
              <span className="AmountWithFeeValue">
                {calculateTotalAmountWithServiceFee()} {senderCurrencyType}
              </span>
            </div>
            <div className="WithServiceFee">(with Service Fee)</div>
          {/* </Box>
          <Box mt={2}> */}
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
          {/* </Box>
          <Box mt={2}> */}
            <div className="ReferenceText">Reference :</div>
            <input
              type="text"
              className="ReferenceInput"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          {/* </Box> */}

          {/* <Box mt={2}> */}
          <Button
            className="TransferButton"
            variant="contained"
            color="primary"
            onClick={handleTransfer}
          >
            Transfer
          </Button>
        {/* </Box> */}
        </div>
      </Box>
    </div>
  );
};

export default Transfer;

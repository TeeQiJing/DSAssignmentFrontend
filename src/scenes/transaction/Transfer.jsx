import React, { useState, useEffect } from "react";
import { Box, Button, Select, MenuItem } from "@mui/material";
import { useLocation } from "react-router-dom";
import { BiTransfer } from "react-icons/bi";
import axios from "axios";

import { useAuth } from "../../AuthProvider";
import GetUserAvatar from "../../GetUserAvatar";
import "./Transfer.css";

const Transfer = () => {
  // const navigate = useNavigate();
  const { userData } = useAuth();
  const { login } = useAuth();
  const [senderAccountNumber, setSenderAccountNumber] = useState("");
  const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
  const [receiverUsername, setReceiverUsername] = useState("");
  const [senderUsername, setSenderUsername] = useState("");
  const [transferAmount, setTransferAmount] = useState(0);
  const [senderCurrencyType, setSenderCurrencyType] = useState();
  const [receiverCurrencyType, setReceiverCurrencyType] = useState("");
  const [dailyLimit, setDailyLimit] = useState(0);
  const [reference, setReference] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currencies, setCurrencies] = useState([]);
  // const [receiverCurrency, setReceiverCurrency] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [serviceRate, setServiceRate] = useState(0);
  const [totalServiceFee, setTotalServiceFee] = useState(0);

  const location = useLocation();
  const accountNumber = location.state ? location.state.accountNumber : null;

  useEffect(() => {
    const refresh = async () => {
      try {
        const accountResponse = await axios.get(
          `http://localhost:8080/account/${userData.account_number}`
        );
        const updatedUserData = accountResponse.data;
        login(updatedUserData);
      } catch (error) {
        console.error(error);
      }
    };
    
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/account/${accountNumber}`
        );
        const data = response.data;
        setSenderCurrencyType(userData.currency);
        setReceiverUsername(data.username);
        setReceiverCurrencyType(data.currency);
        setDailyLimit(userData.trans_limit);
      } catch (error) {
        console.error("Error :", error);
      }
    };

    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/currencyConversion/unique-coins"
        );
        setCurrencies(response.data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    refresh();
    fetchData();
    fetchCurrencies();

    setSenderAccountNumber(userData.account_number);
    setReceiverAccountNumber(accountNumber);
    setSenderUsername(userData.username);
  }, [accountNumber, userData]);

  useEffect(() => {
    const fetchConversionData = async () => {
      if (transferAmount >= 0 && senderCurrencyType && receiverCurrencyType) {
        try {
          const response = await axios.get(
            `http://localhost:8080/currencyConversion/conversion/${senderCurrencyType}/${receiverCurrencyType}/${transferAmount}`
          );
          const [convertedValue, fee] = response.data;
          setConvertedAmount(convertedValue);
          setServiceRate(parseFloat(fee).toFixed(2));
          setTotalServiceFee((parseFloat(fee) * transferAmount).toFixed(2));
        } catch (error) {
          console.error("Error fetching conversion data:", error);
        }
      }
    };

    fetchConversionData();
  }, [transferAmount, senderCurrencyType, receiverCurrencyType]);

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      // const receiverCurrencyResponse = await axios.get(
      //   `http://localhost:8080/currencyConversion/conversion/${senderCurrencyType}/${rec}/${transferAmount}`
      // );
      // const data = response.data;

      const transactionData = {
        deduct_amount: parseFloat(transferAmount) + parseFloat(totalServiceFee),
        add_amount: parseFloat(convertedAmount),
        sender_account_number: senderAccountNumber,
        receiver_account_number: receiverAccountNumber,
        reference: reference,
        category: selectedCategory,
      };
      console.log(transactionData);
      // "deduct_amount": 120000,
      // "add_amount":5882.35,
      // "category":"Game",
      // "reference":"HAHAHAH",
      // "sender_account_number":"54321",
      // "receiver_account_number":"12345"

      const getCurrentDateTime = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const date = currentDate.getDate().toString().padStart(2, '0');
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');
      
        return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
      };



      const response = await axios.post(
        `http://localhost:8080/transaction/add`,
        JSON.stringify(transactionData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if(!response) return;

      // const responseNext = await axios.post(
      //   `http://localhost:8080/transaction/add`,
      //   JSON.stringify(transactionData), {
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      // });
      const accountResponse = await axios.get(
        `http://localhost:8080/account/${userData.account_number}`
      );

      if(!accountResponse) return;

      const updatedUserData = accountResponse.data;
      login(updatedUserData);



      const receiptData = {
        transfer_amount: parseFloat(transferAmount).toFixed(2),
        service_fee: parseFloat(totalServiceFee).toFixed(2),
        add_amount: parseFloat(convertedAmount).toFixed(2),
        sender_currency_type: userData.currency,
        receiver_currency_type: receiverCurrencyType,
        sender_username: userData.username,
        receiver_username: receiverUsername,
        sender_account_number: senderAccountNumber,
        receiver_account_number: receiverAccountNumber,
        datetime: getCurrentDateTime(),
        reference: reference,
        category: selectedCategory,
      };

      try{
        const emailResponse = await axios.post(
          `http://localhost:8080/transaction/sendReceipt/${userData.email}`, receiptData
        );

      }catch(emailError){
        alert('Transaction has Completed Successfully. However, the E-Receipt has failed to be Sent due to Network Issue. Please Try Again Later')
        return;
      }
      




      alert("Transfer Successfully! Please check your email for your e-Receipt!");
      window.location.href = "/transaction";
    } catch (error) {
      
      alert('Insufficient Balance or Transaction Limit Exceeded!');
    }
  };

  return (
    <div className="WrapperTransfer">
      <Box m="40px" mt="80px">
        <div className="InnerWrapperTransfer">
          <div
            className="avatar"
            style={{ transform: "translateX(172px) translateY(7px)" }}
          >
            <GetUserAvatar accountNumber={senderAccountNumber} />
          </div>
          <div
            className="avatar"
            style={{ transform: "translateX(504px) translateY(-112px)" }}
          >
            <GetUserAvatar accountNumber={receiverAccountNumber} />
          </div>
          <div className="transferIcon">
            <BiTransfer />
          </div>
          <h2 className="TransferFromText">Transfer From </h2>
          <h2 className="TransferToText">Transfer To </h2>
          <div className="NameText">Name : </div>
          <div className="SendName">{senderUsername}</div>
          <div className="ReceiveName">{receiverUsername}</div>
          <div className="AccountNumText">Account Number : </div>
          <div className="SendAccNum">{senderAccountNumber}</div>
          <div className="ReceiveAccNum">{receiverAccountNumber}</div>
          <div className="AmountText">
            Amount : <br />
            (Daily limit {parseFloat(dailyLimit).toFixed(2)} {userData.currency})
          </div>
          <input
            className="AmountSpace"
            type="number"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)} 
          />

          <div>
            <Select
              className="CurrencySelector1"
              value={userData.currency}
              onChange={(e) => setSenderCurrencyType(e.target.value)}
            >
              {currencies.map((currency) => (
                <MenuItem
                  key={currency}
                  value={currency}
                  disabled={currency !== userData.currency}
                >
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <Select
              className="CurrencySelector2"
              value={receiverCurrencyType} // Set the value here
              onChange={(e) => setReceiverCurrencyType(e.target.value)}
            >
              {currencies.map((currency) => (
                <MenuItem
                  key={currency}
                  value={currency}
                  disabled={currency !== receiverCurrencyType}
                >
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="TotalAmount">
            Total Amount :
            {
              "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"
            }
            <span className="AmountValue">
              {transferAmount} {senderCurrencyType} ={" "}
              {parseFloat(convertedAmount).toFixed(2)} {receiverCurrencyType}
            </span>
          </div>
          <div className="ServiceFee">
            Service Fee :
            {
              "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"
            }
            <span className="FeeValue">
              {totalServiceFee} {senderCurrencyType}
            </span>
          </div>
          <div className="TotalAmountWithFee">
            Total Amount :
            {
              "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"
            }
            <span className="AmountWithFeeValue">
              {(
                parseFloat(transferAmount) + parseFloat(totalServiceFee)
              ).toFixed(2)}{" "}
              {senderCurrencyType}
            </span>
          </div>

          <div className="WithServiceFee">(with Service Fee)</div>
          <div className="CategoryText">Category :</div>
          <select
            className="CategorySelect"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Education">Education</option>
            <option value="Game">Game</option>
            <option value="Business">Business</option>
            <option value="Others">Others</option>
          </select>
          <div className="ReferenceText">Reference :</div>
          <input
            type="text"
            className="ReferenceInput"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
          <Button
            className="TransferButton"
            variant="contained"
            color="primary"
            onClick={handleTransfer}
          >
            Transfer
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Transfer;

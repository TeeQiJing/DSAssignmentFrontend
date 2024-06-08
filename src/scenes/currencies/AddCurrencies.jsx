import React, { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {styled} from "@mui/material";
import "./AddCurrencies.css";
import axios from "axios";
// import { useAuth } from "../../AuthProvider";

const AddCurrencies = () => {
//   const { userData } = useAuth();
  //   const [nickName, setNickName] = useState("");
  //   const [phoneNumber, setPhoneNumber] = useState("");
  //   const [phoneNumber, setPhoneNumber] = useState("");
  const [sourceCoin, setSourceCoin] = useState("");
  const [destinationCoin, setDestinationCoin] = useState("");
  const [value, setValue] = useState(0);
  const [processingFee, setProcessingFee] = useState(0);

  const navigate = useNavigate();

  const handleFinish = async () => {
    // Validate the fields
    if (!value || value.trim() === "") {
      alert("Please enter a value!");
      return;
    }

    if (!processingFee || processingFee.trim() === "") {
      alert("Please enter Processing Fee!");
      return;
    }

    const currencyData ={
        destinationCoin: destinationCoin,
        sourceCoin:sourceCoin,
        value:value,
        processingFee: processingFee,
     }

    try {
      const response = await axios.post(
        `http://localhost:8080/currencyConversion/addCurrency`,
        JSON.stringify(currencyData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful response
      console.log(response.data); // You can access response data here if needed
      alert("New Currency Successfully Added");
      navigate("/currencies");
    } catch (error) {
      console.error(error);
      alert("Error during Adding Currency. Please Try Again!");
    }

  };

  return (
    <div className="WrapperCurrency">
      <Box>
        <h2 className="AddNewCurrencyText">Add New Currency</h2>

        {/* <div className="balanceText">
          Current Balance : {balance} {currency}
        </div> */}

        <TextField
          className="SourceCoinField"
          label="Source Coin"
          value={sourceCoin}
          onChange={(e) => setSourceCoin(e.target.value)}
          variant="outlined"
          fullWidth
          type="text"
          autoComplete="off"

        />
        <TextField
          className="DestinationCoinField"
          label="Destination Coin"
          value={destinationCoin}
          onChange={(e) => setDestinationCoin(e.target.value)}
          variant="outlined"
          fullWidth
          type="text"
          autoComplete="off"
        />

        <TextField
          className="ValueField"
          label="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          variant="outlined"
          fullWidth
          type="number"
          autoComplete="off"
        />
        <TextField
          className="ProcessingFeeField"
          label="Processing Fee"
          value={processingFee}
          onChange={(e) => setProcessingFee(e.target.value)}
          variant="outlined"
          fullWidth
          type="number"
          autoComplete="off"
        />
        <Box mt={2} className="ButtonFinish">
          <Button variant="contained" color="primary" onClick={handleFinish} fullWidth>
            Add
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default AddCurrencies;

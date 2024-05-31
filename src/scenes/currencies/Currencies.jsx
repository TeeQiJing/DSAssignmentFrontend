import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

const Currencies = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currencyData, setCurrencyData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get("http://localhost:8080/currencyConversion/getAllCurrency");
        const currencies = response.data;

        const formattedCurrencyData = currencies.map((currency, index) => {
        //   const registerDate = account.register_date.split(" ")[0];
          // const formattedCardNum = account.card.card_num.match(/.{1,4}/g).join("   ");
          
          return {
            ...currency,
            id: index + 1,
            // balance: `${parseFloat(account.balance).toFixed(2)} ${account.currency}`,
            // initial_balance: `${parseFloat(account.initial_balance).toFixed(0)} ${account.currency}`,
            // trans_limit: `${parseFloat(account.trans_limit).toFixed(0)} ${account.currency}`,
            // register_date: registerDate,
            // card_num: formattedCardNum,
            // card_type: account.card.card_type,
            // card_pin: account.card.card_pin,
            // cvv: account.card.cvv,
            // expiry_date: account.card.expiry_date,
          };
        });

        setCurrencyData(formattedCurrencyData);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  const columns = [
    { field: "id", headerName: "No.", flex: 1 },
    { field: "sourceCoin", headerName: "Source Coin", flex: 1 },
    { field: "destinationCoin", headerName: "Destination Coin", flex: 1 },
    { field: "value", headerName: "Value", flex: 1 },
    { field: "processingFee", headerName: "Processing Fee", flex: 1.5 },
    // { field: "interest_rate", headerName: "Interest Rate", flex: 1 },
    // { field: "balance", headerName: "Balance", flex: 2 },
    // { field: "initial_balance", headerName: "Initial Balance", flex: 1.5 },
    // { field: "account_type", headerName: "Account Type", flex: 1.5 },
    // { field: "register_date", headerName: "Register Date", flex: 1.5 },
  ];

  return (
    <Box m="20px">
      <Header title="CURRENCIES" subtitle="Managing All Currencies" />
      
        <Box >
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => navigate("/addcurrencies")}
          >
            <AddIcon sx={{ mr: "10px" }} />
            Add Currencies
          </Button>
        </Box>
      <Box
        m="20px 0 0 0"
        height="66vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid rows={currencyData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Currencies;

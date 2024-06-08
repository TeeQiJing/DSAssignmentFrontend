import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";

const Accounts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/account/all");
        const accounts = response.data;

        const formattedAccountData = accounts.map((account) => {
          const registerDate = account.register_date.split(" ")[0];
          // const formattedCardNum = account.card.card_num.match(/.{1,4}/g).join("   ");
          
          return {
            ...account,
            id: account.account_number,
            balance: `${parseFloat(account.balance).toFixed(2)} ${account.currency}`,
            initial_balance: `${parseFloat(account.initial_balance).toFixed(0)} ${account.currency}`,
            trans_limit: `${parseFloat(account.trans_limit).toFixed(0)} ${account.currency}`,
            register_date: registerDate,
            // card_num: formattedCardNum,
            // card_type: account.card.card_type,
            // card_pin: account.card.card_pin,
            // cvv: account.card.cvv,
            // expiry_date: account.card.expiry_date,
          };
        });

        setAccountData(formattedAccountData);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const columns = [
    { field: "account_number", headerName: "Account", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "password", headerName: "Password", flex: 1 },
    // { field: "dob", headerName: "DOB", flex: 1 },
    // { field: "address", headerName: "Address", flex: 1 },
    { field: "mobile", headerName: "Mobile", flex: 1.5 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "trans_limit", headerName: "Transaction Limit", flex: 1.5 },
    { field: "interest_rate", headerName: "Interest Rate", flex: 1 },
    { field: "balance", headerName: "Balance", flex: 2 },
    { field: "initial_balance", headerName: "Initial Balance", flex: 1.5 },
    { field: "account_type", headerName: "Account Type", flex: 1.5 },
    { field: "register_date", headerName: "Register Date", flex: 1.5 },
    // { field: "card_num", headerName: "Card Number", flex: 1.5 },
    // { field: "card_type", headerName: "Card Type", flex: 1 },
    // { field: "card_pin", headerName: "Card PIN", flex: 1 },
    // { field: "cvv", headerName: "CVV", flex: 1 },
    // { field: "expiry_date", headerName: "Expiry Date", flex: 1 },
    // { field: "secure_phrase", headerName: "Secure Phrase", flex: 1.5 },
  ];

  return (
    <Box m="20px">
      <Header title="ACCOUNTS" subtitle="Managing All Accounts" />
      <Box
        m="20px 0 0 0"
        height="75vh"
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
        <DataGrid rows={accountData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Accounts;

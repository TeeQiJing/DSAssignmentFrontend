import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useAuth } from "../../AuthProvider";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const TransactionHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {userData} = useAuth();
  const [transactionData, setTransactionData] = useState([]);


  useEffect(() => {
    const fetchTransactionsHistory = async () => {
      try {
        // Make API request to fetch transactions history
        const response = await axios.get(`http://localhost:8080/transaction/getTransactionHistory/${userData.account_number}`);
        const transactions = response.data;
  
        // Extract unique user account numbers from transactions
        const uniqueAccountNumbers = [...new Set(transactions.flatMap(transaction => [transaction.sender_account_number, transaction.receiver_account_number]))];
  
        // Fetch user data for all unique account numbers in parallel
        const userResponses = await Promise.all(uniqueAccountNumbers.map(accountNumber => axios.get(`http://localhost:8080/account/${accountNumber}`)));
        const userDataMap = Object.fromEntries(userResponses.map(response => [response.data.account_number, response.data]));
  
        // Format the transaction data
        const formattedTransactionData = transactions.map(transaction => ({
          ...transaction,
          id: transaction.transaction_id, // Rename transaction_id to id
          sender: `${transaction.sender_account_number} - ${userDataMap[transaction.sender_account_number]?.username || ''}`,
          receiver: `${transaction.receiver_account_number} - ${userDataMap[transaction.receiver_account_number]?.username || ''}`,
          amount: transaction.amount,
          category: transaction.category,
          reference: transaction.reference
        }));
  
        // Set the formatted transaction data
        setTransactionData(formattedTransactionData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
  
    fetchTransactionsHistory();
  }, [userData.account_number]);
   
  


  
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "sender",
      headerName: "Sender",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "receiver",
      headerName: "Receiver",
      flex: 1,
      cellClassName: "name-column--cell",
      // type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "reference",
      headerName: "Reference",
      flex: 2,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "date_of_trans",
      headerName: "Date",
      flex: 1,
      headerAlign: "left",
      align: "left",
      // renderCell: ({ row: { access } }) => {
      //   return (
      //     <Box
      //       width="60%"
      //       m="0 auto"
      //       p="5px"
      //       display="flex"
      //       justifyContent="center"
      //       backgroundColor={
      //         access === "admin"
      //           ? colors.greenAccent[600]
      //           : access === "manager"
      //           ? colors.greenAccent[700]
      //           : colors.greenAccent[700]
      //       }
      //       borderRadius="4px"
      //     >
      //       {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
      //       {access === "manager" && <SecurityOutlinedIcon />}
      //       {access === "user" && <LockOpenOutlinedIcon />}
      //       <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
      //         {access}
      //       </Typography>
      //     </Box>
      //   );
      // },
    },
  ];

  return (
    <Box m="20px" >
      <Header title="TRANSACTION HISTORY" subtitle="Managing Your Transactions" />
      <Box
        m="40px 0 0 0"
        height="73vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",

          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
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
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={transactionData} columns={columns} />
      </Box>
    </Box>
  );
};

export default TransactionHistory;
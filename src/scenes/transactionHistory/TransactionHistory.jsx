import { Box, Button, Typography, useTheme } from "@mui/material";
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
  const { userData } = useAuth();
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
        const formattedTransactionData = await Promise.all(transactions.map(async transaction => {
          // Fetch receiver's user data including currency
          const receiverAccountResponse = await axios.get(`http://localhost:8080/account/${transaction.receiver_account_number}`);
          const receiverUserData = receiverAccountResponse.data;

          const convertedAmountResponse = await axios.get(`http://localhost:8080/currencyConversion/conversion/${receiverUserData.currency}/${userData.currency}/${parseFloat(transaction.amount)}`);
          const convertedAmount = (convertedAmountResponse.data[0]).toFixed(2);

          return {
            ...transaction,
            id: transaction.transaction_id, // Rename transaction_id to id
            sender: `${transaction.sender_account_number} - ${userDataMap[transaction.sender_account_number]?.username || ''}`,
            receiver: `${transaction.receiver_account_number} - ${userDataMap[transaction.receiver_account_number]?.username || ''}`,
            amount: convertedAmount,
            category: transaction.category,
            reference: transaction.reference,
            date_of_trans: transaction.date_of_trans,
            // receiverCurrency: receiverUserData.currency, 
          };
        }));

        // Set the formatted transaction data
        setTransactionData(formattedTransactionData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactionsHistory();
  }, [userData.account_number]);

  const handleSendReceipt = async (transaction) => {
    if(window.confirm("Send E-Receipt for Transaction Id of " + transaction.id + "?")){
      // console.log("Send receipt for transaction:", transaction);
 
      const transactionData = (await axios.get(`http://localhost:8080/transaction/getSpecificTransactionHistory/${transaction.id}`)).data;
      // const userType = userData.account_number === transactionResponse.data.sender_account_number ? "sender" : "receiver";


      const sender = (await axios.get(`http://localhost:8080/currencyConversion/conversion/${transactionData.receiver.currency}/${transactionData.sender.currency}/${transactionData.amount}`)).data;
      const sender_amount = sender[0];
      const totalServiceFee = sender[1] * sender_amount;
      const convertedAmount = transactionData.amount;

      console.log(sender_amount);
      const receiptData = {
          transfer_amount: parseFloat(sender_amount).toFixed(2),
          service_fee: parseFloat(totalServiceFee).toFixed(2),
          add_amount: parseFloat(convertedAmount).toFixed(2),
          sender_currency_type: transactionData.sender.currency,
          receiver_currency_type: transactionData.receiver.currency,
          sender_username: transactionData.sender.username,
          receiver_username: transactionData.receiver.username,
          sender_account_number: transactionData.sender.account_number,
          receiver_account_number: transactionData.receiver.account_number,
          datetime: transactionData.date_of_trans,
          reference: transactionData.reference,
          category: transactionData.category
        };

        console.log(receiptData);
      // }else{


      // }

 

      try{
        const emailResponse = await axios.post(
          `http://localhost:8080/transaction/sendReceipt/${userData.email}`, receiptData
        );

        alert('The E-Receipt with Transaction Id of ' + transaction.id + ' have sent to ' + userData.email)

      }catch(emailError){
        alert('The E-Receipt has failed to be Sent')
        return;
      }

    }
    
    // Implement your logic to send receipt here
  };

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
      headerName: "Amount (" + userData.currency + "s)",
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
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSendReceipt(params.row)}
        >
          E-Receipt
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
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

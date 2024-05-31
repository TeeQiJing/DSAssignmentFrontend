import { Box, Typography, useTheme, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthProvider";

const AdminTransactionHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [transactionData, setTransactionData] = useState([]);
  const { userData } = useAuth();
  const [selectedCurrency, setSelectedCurrency] = useState("receiver"); // default to receiver currency

  const fetchConvertedAmount = async (amount, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) return amount;
    try {
      const response = await axios.get(`http://localhost:8080/currencyConversion/conversion/${fromCurrency}/${toCurrency}/${parseFloat(amount)}`);
      return (response.data[0]).toFixed(2);
    } catch (error) {
      console.error("Error converting amount:", error);
      return amount;
    }
  };

  const handleSendReceipt = async (transaction) => {
    if(window.confirm("Send E-Receipt for Transaction Id of " + transaction.id + " to "+ userData.email+"?")){
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

  useEffect(() => {
    const fetchTransactionsHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/transaction/getAllTransactionHistory`);
        const transactions = response.data;

        const uniqueAccountNumbers = [...new Set(transactions.flatMap(transaction => [transaction.sender_account_number, transaction.receiver_account_number]))];
        const userResponses = await Promise.all(uniqueAccountNumbers.map(accountNumber => axios.get(`http://localhost:8080/account/${accountNumber}`)));
        const userDataMap = Object.fromEntries(userResponses.map(response => [response.data.account_number, response.data]));

        const formattedTransactionData = await Promise.all(transactions.map(async transaction => {
          const receiverUserData = userDataMap[transaction.receiver_account_number];
          const senderUserData = userDataMap[transaction.sender_account_number];

          const fromCurrency = receiverUserData.currency;
          const toCurrency = selectedCurrency === "receiver" ? receiverUserData.currency : senderUserData.currency;
          const convertedAmount = await fetchConvertedAmount(transaction.amount, fromCurrency, toCurrency);

          return {
            ...transaction,
            id: transaction.transaction_id,
            sender: `${transaction.sender_account_number} - ${userDataMap[transaction.sender_account_number]?.username || ''}`,
            receiver: `${transaction.receiver_account_number} - ${userDataMap[transaction.receiver_account_number]?.username || ''}`,
            amount: (parseFloat(convertedAmount).toFixed(2)).toString() +" " +toCurrency,
            category: transaction.category,
            reference: transaction.reference,
          };
        }));

        setTransactionData(formattedTransactionData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactionsHistory();
  }, [selectedCurrency]);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
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
      headerAlign: "left",
      align: "left",
    },
    {
      field: "amount",
      headerName: `Amount (${selectedCurrency === "receiver" ? "Receiver's Currency" : "Sender's Currency"})`,
      type: "number",
      flex: 1.8,
      headerAlign: "left",
      align: "left",
      sortable: false
    },
    {
      field: "reference",
      headerName: "Reference",
      flex: 1.5,
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
      flex: 1.5,
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
      <Header title="TRANSACTION HISTORY" subtitle="Managing All Transactions" />
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="currency-select-label">Currency</InputLabel>
        <Select
          labelId="currency-select-label"
          id="currency-select"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          label="Currency"
        >
          <MenuItem value="receiver">Receiver Currency</MenuItem>
          <MenuItem value="sender">Sender Currency</MenuItem>
        </Select>
      </FormControl>
      <Box
        m="20px 0 0 0"
        height="65vh"
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

export default AdminTransactionHistory;
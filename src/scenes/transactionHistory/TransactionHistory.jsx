import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Header from "../../components/Header";
import TransactionItem from "./TransactionItem";
import axios from "axios";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../../AuthProvider";
import "./TransactionHistory.css"
import { Margin } from "@mui/icons-material";

const TransactionHistory = () => {
  // State for transaction data
  const [transactions, setTransactions] = useState([]);
  const { userData } = useAuth();
  // State for filters (date range, category, etc.)
  // const [filters, setFilters] = useState({
  //   startDate: null,
  //   endDate: null,
  //   category: "",
  // });


  // Fetch transaction data based on filters
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Make API request to fetch transactions
        const response = await axios.get(`http://localhost:8080/transaction/getTransactionHistory/${userData.account_number}`);
        setTransactions(response.data);
        // console.log(transactions); // Log response.data to inspect its structure
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, [userData.account_number]);

  console.log(transactions); // Log transactions outside useEffect
  // Handle filter changes
  // const handleFilterChange = (filterName, value) => {
  //   setFilters({ ...filters, [filterName]: value });
  // };

  // Predefined list of categories
  // const categories = ["Game", "Entertainment", "Grocery", "Business"];

  return (
    <Box m="20px">
    <Header title="Transaction History" />
    <TableContainer component={Paper} >
      <Table className="BigTable">
        <TableHead >
          <TableRow className="SenderCell">
            <TableCell className="SenderCell" style={{ transform: 'translateX(10px)' }}>Sender</TableCell>
            <TableCell className="ReceiverCell" style={{ transform: 'translateX(-150px)' }}>Receiver</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Reference</TableCell>
            <TableCell>Sender Account</TableCell>
            <TableCell>Receiver Account</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="Tablebody">
          {transactions.map((transaction, index) => (
            <TransactionItem key={index} transaction={transaction} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
  );
};

export default TransactionHistory;

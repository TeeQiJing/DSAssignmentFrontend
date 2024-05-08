import React from "react";
import { Box, Typography } from "@mui/material";
import "./TransactionItem.css";

const TransactionItem = ({ transaction }) => {
  // Function to determine if the transaction is incoming or outgoing
  const isOutgoing = transaction.amount < 0;

  return (
    <Box className="transactionBox">
      {/* Display sender and receiver usernames */}
      <Typography className="TransactionSenderName"> senderName</Typography>
      <Typography className="TransactionReceiverName"> ReceiverName</Typography>
      {/* Display date and time */}
      <Typography className="TransactionDate"> {transaction.date_of_trans}</Typography>
      {/* Display category, reference, and account numbers */}
      <Typography className="TransactionCategory"> {transaction.category}</Typography>
      <Typography className="TransactionReference"> {transaction.reference}</Typography>
      <Typography className="Send_Acc">{transaction.sender_account_number}</Typography>
      <Typography className="Receive_Acc">{transaction.receiver_account_number}</Typography>
      {/* Display amount */}
      <Typography className="TransactionAmount">{transaction.amount} </Typography>
    </Box>
  );
};

export default TransactionItem;

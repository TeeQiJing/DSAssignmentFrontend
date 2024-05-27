// import React, { useEffect, useState } from "react";
// import { Box, TextField, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import {styled} from "@mui/material";
// import "./Topup.css";
// import axios from "axios";
// import { useAuth } from "../../AuthProvider";

// const Profile = () => {
//   const { userData } = useAuth();
//   //   const [nickName, setNickName] = useState("");
//   //   const [phoneNumber, setPhoneNumber] = useState("");
//   //   const [phoneNumber, setPhoneNumber] = useState("");
//   const [balance, setBalance] = useState(0);
//   const [amount, setAmount] = useState(0);
//   const [currency, setCurrency] = useState("");
//   const [reference, setReference] = useState("");



//   useEffect(() => {
//     const fetchBalance = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/account/${userData.account_number}`
//         );
//         setBalance(parseFloat(response.data.balance).toFixed(2));
//         setCurrency(response.data.currency);
//       } catch (error) {
//         console.error("Error fetching Balance:", error);
//       }
//     };

//     fetchBalance();
//   }, [userData.account_number]);

//   const navigate = useNavigate();

//   const handleFinish = async () => {
//     // Validate the fields
//     if (!amount || amount.trim() === "") {
//       alert("Please enter an amount!");
//       return;
//     }

//     const transactionData ={
//         deduct_amount: 0,
//         add_amount:amount,
//         category:'Topup',
//         reference:reference,
//         sender_account_number:userData.account_number,
//         receiver_account_number:userData.account_number
//      }

//     try {
//       const response = await axios.post(
//         `http://localhost:8080/transaction/topup`,
//         JSON.stringify(transactionData),
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Handle successful response
//       console.log(response.data); // You can access response data here if needed
//       console.log("Successfully Top Up");
//       navigate("/transaction");
//     } catch (error) {
//       console.error(error);
//       alert("Error during Top Up. Please Try Again!");
//     }

//     // Redirect to Transfer.jsx after adding the contact
//   };

//   return (
//     <div className="WrapperTopUp">
//       <Box>
//         <h2 className="TopUpBalanceText">Top Up Balance</h2>

//         <div className="balanceText">
//           Current Balance : {balance} {currency}
//         </div>

//         <TextField
//           className="AmountField"
//           label="Top Up Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           variant="outlined"
//           fullWidth
//           type="number"
//           autoComplete="off"

//         />
//         <TextField
//           className="Reference"
//           label="Reference"
//           value={reference}
//           onChange={(e) => setReference(e.target.value)}
//           variant="outlined"
//           fullWidth
//           autoComplete="off"
//         />
//         <Box mt={2} className="ButtonFinish">
//           <Button variant="contained" color="primary" onClick={handleFinish} fullWidth>
//             Top Up
//           </Button>
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default Profile;

// Import all packages used
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../theme';
import StatBox from '../components/StatBox';
import { PiCoinFill, PiCoinsFill } from "react-icons/pi";
import { FaCoins } from "react-icons/fa";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import Header from '../components/Header';
import AdminDashboardPie from '../scenes/adminpie/AdminDashboardPie';
import html2canvas from 'html2canvas';

const AdminDashboard = () => {
  // Declare all variables 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [transactions, setTransactions] = useState([]);
  const [formattedAmounts, setFormattedAmounts] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    silverUsers: 0,
    goldenUsers: 0,
    platinumUsers: 0
  });
  const dashboardRef = useRef(null);

  // This method Will be called in the beginning
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Used axios get method and SpringBoot APIs to get recent transaction history
        const response = await axios.get('http://localhost:3000/transaction/getRecentTransactionHistory');
        // Get 5 latest transaction records and store in variable
        setTransactions(response.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  // This method Will be called in the beginning
  useEffect(() => {
    const fetchFormattedAmounts = async () => {
      const amounts = {};
      for (const transaction of transactions) {
        // From every single transactions we fetch, store the fields of amount, sender, receiver, transaction_id
        const { amount, sender, receiver, transaction_id } = transaction;

        // Since the amount field display the value in receiver's currency, we convert it to sender's currency with correspond value
        const convertedAmount = await getConvertedAmount(receiver.currency, sender.currency, amount);

        // Set converted amount
        amounts[transaction_id] = `${convertedAmount} ${sender.currency}s`;
      }
      setFormattedAmounts(amounts);
    };


    if (transactions.length > 0) {
      fetchFormattedAmounts();
    }
  }, [transactions]);

  // Convert amount method
  const getConvertedAmount = async (receiverCurrency, senderCurrency, amount) => {
    try {
      const response = await axios.get(`http://localhost:3000/currencyConversion/conversion/${receiverCurrency}/${senderCurrency}/${amount}`);
      return parseFloat(response.data[0]).toFixed(2);
    } catch (error) {
      console.error('Error fetching converted amount:', error);
      return amount;
    }
  };

  // HTML2CANVAS Screenshot function in dashboard
  const handleDownloadImage = () => {
    // find element which having ref={dashboardRef}
    html2canvas(dashboardRef.current).then((canvas) => {
      const link = document.createElement('a');
      // Generate 'dashboard.png'
      link.download = 'dashboard.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  // This method Will be called in the beginning
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Get all account in database by using the SpringBoot APIs
        const response = await axios.get('http://localhost:3000/account/all');
        const users = response.data;
        const totalUsers = users.length;

        // Set amount for 3 different user types
        const silverUsers = users.filter(user => user.account_type === 'Silver Snitch').length;
        const goldenUsers = users.filter(user => user.account_type === 'Golden Galleon').length;
        const platinumUsers = users.filter(user => user.account_type === 'Platinum Patronus').length;
        
        setUserStats({
          totalUsers,
          silverUsers,
          goldenUsers,
          platinumUsers
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // This method Will be called in the beginning
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        // Get all available currencies 
        const response = await axios.get('http://localhost:3000/currencyConversion/getAllCurrency');
        setCurrencies(response.data);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  // Method to display / render all recent transaction in a Box (scrollable)
  const renderTransactions = () => {
    return transactions.map((transaction, index) => {
      const { transaction_id, sender, date_of_trans } = transaction;

      return (
        <Box
          key={index}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          p="15px"
        >
          <Box>
            {/* Transaction ID */}
            <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
              {`TRX${transaction_id}`}
            </Typography>
            {/* Sender Username */}
            <Typography color={colors.grey[100]}>{sender.username}</Typography>
          </Box>
          {/* Date of Transaction */}
          <Box color={colors.grey[100]}>{date_of_trans}</Box>

          {/* Transaction Amount (in Sender's Currencies) */}
          <Box backgroundColor={colors.greenAccent[600]} p="5px 10px" borderRadius="4px">
            {formattedAmounts[transaction_id] || "Loading..."}
          </Box>
        </Box>
      );
    });
  };

  // Method to display / render all available currencies in a Box (scrollable)
  const renderCurrencies = () => {
    return currencies.map((currency, index) => {
      const { sourceCoin, destinationCoin, value } = currency;
  
      return (
        <Box
          key={index}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          p="20px"
        >
          <Box>
            {/* Source Coin -> Destination Coin */}
            <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600" letterSpacing="1px">
              {`${sourceCoin} `}
              <span style={{ fontWeight: 'bold', color: colors.grey[200], fontSize: '20px'}}>➜</span>
              {` ${destinationCoin}`}
            </Typography>
          </Box>
          {/* <Box color={colors.grey[100]} fontSize="14px" >{`Value: ${value}`}</Box> */}
          {/* Value */}
          <Box backgroundColor={colors.greenAccent[600]} p="5px 10px" borderRadius="4px">
            Value: {value || "Loading..."}
          </Box>
        </Box>
      );
    });
  };

  return (
    <Box m="20px" ref={dashboardRef}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box >
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            // Click to download report image (html2canvas screenshot)
            onClick={handleDownloadImage}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* Display Total User */}
          <StatBox
            title={userStats.totalUsers}
            subtitle="Total Users"
            progress="1.00"
            increase="100%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* Display Total Silver User */}
          <StatBox
            title={userStats.silverUsers}
            subtitle="Silver Snitchs"
            progress={userStats.silverUsers / userStats.totalUsers}
            increase={`${((userStats.silverUsers / userStats.totalUsers) * 100).toFixed(2)}%`}
            icon={
              <PiCoinFill
                style={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {/* Display Total Golden User */}
            <StatBox
              title={userStats.goldenUsers}
              subtitle="Golden Galleons"
              progress={userStats.goldenUsers / userStats.totalUsers}
              increase={`${((userStats.goldenUsers / userStats.totalUsers) * 100).toFixed(2)}%`}
              icon={
                <PiCoinsFill
                  style={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {/* Display Total Platinum User */}
            <StatBox
              title={userStats.platinumUsers}
              subtitle="Platinum Patronus"
              progress={userStats.platinumUsers / userStats.totalUsers}
              increase={`${((userStats.platinumUsers / userStats.totalUsers) * 100).toFixed(2)}%`}
              icon={
                <FaCoins
                  style={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
  
          {/* MERGED SECTION */}
          <Box gridColumn="span 8" gridRow="span 4">
            <Box
              bgcolor={colors.primary[400]}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              p="10px"
              height="100%"
            >
              <Typography
                variant="h3"
                fontWeight="600"
                color={colors.grey[100]}
                mb="20px"
                mt="20px"
              >
                Users' Currencies Distribution Chart
              </Typography>
              {/* Display Users' Currencies Distribution Chart using Pie Chart */}
              <AdminDashboardPie/>
            </Box>
          </Box>
  
          {/* Recent Transactions */}
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Recent Transactions
              </Typography>
            </Box>
            {/* Display 5 recent transactions */}
            {renderTransactions()}
          </Box>
  
          {/* Currency Exchange Rate */}
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Currency Exchange Rate
              </Typography>
            </Box>
            {/* Display all available currencies with the conversion rate (value) */}
            {renderCurrencies()}
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default AdminDashboard;
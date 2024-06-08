import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import DownloadOutlined from '@mui/icons-material/DownloadOutlined';
import Header from '../../components/Header';
import html2canvas from 'html2canvas';
import { useAuth } from '../../AuthProvider';
import UserStatBox from '../../components/UserStatBox';
import TodayIcon from '@mui/icons-material/Today';
import SingleStatBox from '../../components/SingleStatBox';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DashboardPie from '../pie/DashboardPie';
import InsightsIcon from '@mui/icons-material/Insights';
import StatBox from '../../components/StatBox';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [transactions, setTransactions] = useState([]);
  const [formattedAmounts, setFormattedAmounts] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const { userData } = useAuth();
  const [userBalance, setUserBalance] = useState(null); // State to hold user balance
  const dashboardRef = useRef(null);
  const [cardDetails, setCardDetails] = useState({ card_num: '', card_type: '' });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/transaction/getRecentTransactionHistory/${userData.account_number}`);
        setTransactions(response.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const fetchFormattedAmounts = async () => {
      const amounts = {};
      for (const transaction of transactions) {
        const { amount, sender, receiver, transaction_id, category } = transaction;
        const convertedAmount = ((sender.account_number === userData.account_number && category !== "Topup")  ? "- " : "+ ") + (await getConvertedAmount(receiver.currency, userData.currency, amount));
        amounts[transaction_id] = `${convertedAmount} ${userData.currency}s`;
      }
      setFormattedAmounts(amounts);
    };
  
    if (transactions.length > 0) {
      fetchFormattedAmounts();
    }
  }, [transactions]);

  const getConvertedAmount = async (receiverCurrency, currentUserCurrency, amount) => {
    try {
      const response = await axios.get(`http://localhost:3000/currencyConversion/conversion/${receiverCurrency}/${currentUserCurrency}/${amount}`);
      return parseFloat(response.data[0]).toFixed(2);
    } catch (error) {
      console.error('Error fetching converted amount:', error);
      return amount;
    }
  };

  const handleDownloadImage = () => {
    html2canvas(dashboardRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'dashboard.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/currencyConversion/getAllCurrency');
        setCurrencies(response.data);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/account/${userData.account_number}`);
        setCardDetails(response.data.card);
        setUserBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching user balance:', error);
      }
    };

    fetchUserBalance();
  }, [userData.account_number]);

  const renderTransactions = () => {
    return transactions.map((transaction, index) => {
      const { transaction_id, sender, date_of_trans, category } = transaction;
      const isSenderCurrentUser = (sender.account_number === userData.account_number && category !== "Topup");
  
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
            <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
              {`TRX${transaction_id}`}
            </Typography>
            <Typography color={colors.grey[100]}>{sender.username}</Typography>
          </Box>
          <Box color={colors.grey[100]}>{date_of_trans}</Box>
          <Box
            backgroundColor={isSenderCurrentUser ? colors.redAccent[400] : colors.greenAccent[600]}
            p="5px 10px"
            borderRadius="4px"
          >
            {formattedAmounts[transaction_id] || "Loading..."}
          </Box>
        </Box>
      );
    });
  };

  const formatCardNumber = (cardNum) => {
    return cardNum.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const calculateDaysPassed = (registerDate) => {
    const registerDateObj = new Date(registerDate);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate - registerDateObj);
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  };

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
            <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600" letterSpacing="1px">
              {`${sourceCoin} `}
              <span style={{ fontWeight: 'bold', color: colors.grey[200], fontSize: '20px'}}>➜</span>
              {` ${destinationCoin}`}
            </Typography>
          </Box>
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
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleDownloadImage}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
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
          <UserStatBox
            title={userBalance !== null ? parseFloat(userBalance).toFixed(2) + " " + userData.currency + "s" : 'Loading...'}
            subtitle="Total Balance"
            progress={
              userBalance !== null && userData.initial_balance !== 0 
                ? Math.abs(parseFloat(userBalance) - parseFloat(userData.initial_balance)) / parseFloat(userData.initial_balance) 
                : 0
            }
            increase={
              userBalance !== null && userData.initial_balance !== 0 
                ? ((parseFloat(userBalance) - parseFloat(userData.initial_balance)) / userData.initial_balance * 100).toFixed(2) + "%" 
                : ''
            }
            icon={
              <PaidRoundedIcon
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
          <SingleStatBox
            title={(userData.register_date).toString().split(' ')[0]}
            subtitle="Registration Date"
            increase={`${calculateDaysPassed(userData.register_date)} days`}
            icon={
              <TodayIcon
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
          <SingleStatBox
            title={formatCardNumber(cardDetails.card_num)}
            subtitle="Card Number"
            increase={cardDetails.card_type}
            icon={
              <CreditCardIcon
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
          <SingleStatBox
            title={userData.interest_rate + "%"} 
            subtitle="Interest Rate"

            icon={
              <InsightsIcon
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
              Transactions By Category
            </Typography>
            <DashboardPie/>
            
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
          {renderCurrencies()}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
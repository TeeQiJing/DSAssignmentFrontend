import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from "@nivo/line";
import axios from "axios";
import "./CustomTooltip.css";
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AdminLine = ({ isCustomLineColors = false, isDashboard = false }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [transactionData, setTransactionData] = useState([]);
  const [finalBalance, setFinalBalance] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetch user list
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userResponse = await axios.get('http://localhost:8080/account/all');
        setUsers(userResponse.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch transaction history data and final balance when a user is selected
  useEffect(() => {
    if (selectedUser) {
      const fetchTransactionHistory = async () => {
        try {
          const transactionResponse = await axios.get(`http://localhost:8080/transaction/getTransactionHistory/${selectedUser.account_number}`);
          setTransactionData(transactionResponse.data);
          setFinalBalance(selectedUser.balance);
        } catch (error) {
          console.error("Error fetching transaction history:", error);
        }
      };

      fetchTransactionHistory();
    }
  }, [selectedUser]);

  const handleUserChange = (event) => {
    const user = users.find(user => user.account_number === event.target.value);
    setSelectedUser(user);
  };

  // Process transaction data and calculate balance after each transaction
  const processTransactionData = () => {
    if (!selectedUser) return [];
  
    let balance = finalBalance;
  
    const data = [];
  
    data.push({
      x: selectedUser.register_date ? selectedUser.register_date : null,
      y: parseFloat(selectedUser.initial_balance).toFixed(2),
    });
  
    transactionData.forEach(transaction => {
      if (transaction.sender_account_number === selectedUser.account_number) {
        balance = transaction.sender_balance;
      }
      if (transaction.receiver_account_number === selectedUser.account_number) {
        balance = transaction.receiver_balance;
      }
  
      const date = transaction.date_of_trans ? transaction.date_of_trans : null;
      data.push({
        x: date,
        y: parseFloat(balance).toFixed(2),
      });
    });
  
    console.log("Processed Data:", data); // Add this line
  
    return data;
  };
  

  const CustomTooltip = ({ point }) => {
    return (
      <div className="custom-tooltip">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: point.color, marginRight: '5px' }}></div>
          <p>{point.data.xFormatted}</p>
        </div>
        <p style={{ textAlign: 'center' }}> {point.data.yFormatted} {selectedUser.currency}s</p>
      </div>
    );
  };

  // Format data for Nivo line chart
  const formattedData = [
    {
      id: "balance",
      color: "hsl(357, 87%, 0%)",
      data: processTransactionData(),
    }
  ];

  return (
    <div>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="user-select-label">User</InputLabel>
        <Select
          labelId="user-select-label"
          id="user-select"
          value={selectedUser.account_number || ''}
          onChange={handleUserChange}
          label="User"
        >
          {users.map(user => (
            <MenuItem key={user.account_number} value={user.account_number}>
              {user.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Debugging: Show selected user and transactions */}
      {selectedUser && (
        <div>
          {/* <h3>Selected User: {selectedUser.username}</h3>
          <h4>Initial Balance: {selectedUser.initial_balance}</h4>
          <h4>Final Balance: {finalBalance}</h4> */}
          <div style={{ height: '550px', width: '100%' }}>
          <ResponsiveLine
            data={formattedData}

            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: colors.grey[100],
                  },
                },
                legend: {
                  text: {
                    fill: colors.grey[100],
                  },
                },
                ticks: {
                  line: {
                    stroke: colors.grey[100],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: colors.grey[100],
                  },
                },
              },
              legends: {
                text: {
                  fill: colors.grey[100],
                },
              },
              tooltip: {
                container: {
                  color: colors.primary[500],
                },
              },
            }}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{
              type: "point",
              format: "%Y-%m-%d",
              tickValues: "every 1 day",
            }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            curve="monotoneX"
            axisBottom={{
              legend: "Date",
              legendOffset: -15,
              legendPosition: "middle",
              tickSize: 0,
              tickPadding: 12,
            }}
            axisLeft={{
              legend: `Balance (${selectedUser.currency}s)`,
              legendOffset: 15,
              legendPosition: "middle"
            }}
            enableGridX={false}
            enableGridY={false}
            isInteractive={true}
            enablePoints={true}
            useMesh={true}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            layers={[
              "grid",
              "markers",
              "axes",
              "areas",
              "crosshair",
              "lines",
              "points",
              "slices",
              "mesh",
              "legends",
            ]}
            tooltip={CustomTooltip}
            />
          </div>
        </div>
      )}

      {/* Debugging: Show message if no user is selected */}
      {!selectedUser && <p>Please select a user to see their transaction history.</p>}
    </div>
  );
};

export default AdminLine;

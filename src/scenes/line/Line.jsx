import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from "@nivo/line";
import axios from "axios";
import { useAuth } from '../../AuthProvider';
import "./CustomTooltip.css";
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';

const Line = ({ isCustomLineColors = false, isDashboard = false }) => {
  const [transactionData, setTransactionData] = useState([]);
  const [finalBalance, setFinalBalance] = useState(null);
  const { userData } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetch transaction history data and final balance
  useEffect(() => {
    const fetchTransactionHistory = async () => {
        try {
          // Fetch transaction history data from the API using user's account number
          const transactionResponse = await axios.get(`http://localhost:8080/transaction/getTransactionHistory/${userData.account_number}`);

          // Sort the transaction data based on the date_of_trans field in descending order
         
          setTransactionData(transactionResponse.data);
        } catch (error) {
          console.error("Error fetching transaction history:", error);
        }
      };

    fetchTransactionHistory();
  }, [userData.account_number]);

  // Process transaction data and calculate balance after each transaction
  // Process transaction data and calculate balance after each transaction
  const processTransactionData = () => {
    let balance = finalBalance; // Set initial balance as final balance
  
    // Create an array to hold the data points
    const data = [];

    // const initialDate = userData.register_date ? new Date(userData.register_date) : null;
    // const formattedinitialDate = initialDate ? `${initialDate.getDate()}-${initialDate.getMonth() + 1}-${initialDate.getFullYear()}` : null;
  
    // console.log(formattedinitialDate);
    // Add the initial point
    data.push({
      x: userData.register_date ? userData.register_date : null, // Convert registration date to milliseconds
      y: userData.initial_balance // Set initial balance
    });
  
    // Process each transaction and update the balance
    transactionData.forEach(transaction => {
      // Update balance if the current user is the sender or receiver
      if (transaction.sender_account_number === userData.account_number) {
        balance = transaction.sender_balance; // Sent money
      }
      if (transaction.receiver_account_number === userData.account_number) {
        balance = transaction.receiver_balance; // Received money
      }
      // Push the transaction data point
    //   const date = transaction.date_of_trans ? new Date(transaction.date_of_trans) : null;
    //   const formattedDate = date ? `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}` : null;

    const date = transaction.date_of_trans ? transaction.date_of_trans : null;
    //   console.log(formattedDate);
      data.push({
        x: date, // Format date as "DD-MM-YYYY"
        y: balance
      });
    });
  
    return data;
};


// const CustomTooltip = ({ point }) => {
//     // `point` contains information about the hovered data point
//     return (
//       <div style={{ background: 'red', padding: '10px', border: '1px solid black', color: 'black' }}>
//         <p>Date: {point.data.x}</p>
//         <p>Balance: {point.data.y}</p>
//       </div>
//     );
//   };
  
console.log(processTransactionData);
  

// Format data for Nivo line chart
const formattedData = [
    {
      id: "balance",
      color: "hsl(357, 87%, 0%)",
      data: processTransactionData(),
      // fill: "rgba(255, 255, 100, 0.3)", // Specify the fill color
    }
  ];
  
  return (
    <ResponsiveLine
  data={formattedData}
  // sliceTooltip={({ slice }) => (
  //   <CustomTooltip point={slice.points[0]} />
  // )}
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
  xScale={{ type: "point" }}
  yScale={{
    type: "linear",
    min: "auto",
    max: "auto",
    stacked: true,
    reverse: false,
  }}
  curve="catmullRom"
  axisBottom={{
    // Axis bottom configuration
  }}
  axisLeft={{
    // Axis left configuration
  }}
  // enableArea={true}  // Enable area
  // areaOpacity={0.2}  // Set area opacity
  // areaBaselineValue={-20}  // Set area baseline value
  enableGridX={false} // Disable grid on X axis
  enableGridY={false} // Disable grid on Y axis
  isInteractive={true} // Enable interactivity
//   enableSlices="x" // Enable slices for X axis
  enablePoints={true} // Enable data points
  useMesh={true} // Use mesh for rendering
  animate={true} // Enable animation
  motionStiffness={90} // Animation stiffness
  motionDamping={15} // Animation damping
  layers={[
    "grid",
    "markers",
    "axes",
    "areas", // Include "areas" layer for area chart
    "crosshair",
    "lines",
    "points",
    "slices",
    "mesh",
    "legends",
  ]}
/>

  );
  
};

export default Line;
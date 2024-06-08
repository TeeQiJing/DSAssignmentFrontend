import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../AuthProvider";
import axios from "axios";
import './CustomTooltip.css'; 
// import { mockPieData as data } from "../data/mockData";

// import { Tooltip } from "@nivo/tooltip";

const Pie = () => {
  const theme = useTheme();
  const {userData}= useAuth();
  const colors = tokens(theme.palette.mode);
  const [gameValue, setGameValue] = useState(0);
  const [foodValue, setFoodValue] = useState(0);
  const [EduValue, setEduValue] = useState(0);
  const [businessValue, setBusinessValue] = useState(0);
  const [otherValue, setOtherValue] = useState(0);

  





useEffect(() => {
  const fetchPieData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/transaction/getPie/${userData.account_number}`);
      const transactions = response.data;
      let food = 0;
      let edu = 0;
      let game = 0;
      let business = 0;
      let other = 0;

      for (const transaction of transactions) {
        const { amount, receiver, category } = transaction;
        const receiverCurrencyType = receiver.currency;
        // const receiverCurrencyType = receiver.currency;
        
        const conversionResponse = await axios.get(
          `http://localhost:8080/currencyConversion/conversion/${receiverCurrencyType}/${userData.currency}/${amount}`
        );
        const [convertedValue] = conversionResponse.data;

        switch (category) {
          case 'Food':
            food += convertedValue;
            break;
          case 'Education':
            edu += convertedValue;
            break;
          case 'Game':
            game += convertedValue;
            break;
          case 'Business':
            business += convertedValue;
            break;
          case 'Others':
            other += convertedValue;
            break;
          default:
            break;
        }
      }

      setFoodValue(food);
      setEduValue(edu);
      setGameValue(game);
      setBusinessValue(business);
      setOtherValue(other);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  fetchPieData();
}, [userData.account_number]);

  const pieData = [{
    id: "Food",
    label: "Food",
    value: foodValue ? foodValue : 0,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "Business",
    label: "Business",
    value: businessValue ? businessValue : 0,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "Game",
    label: "Game",
    value: gameValue ? gameValue : 0,
    color: "hsl(91, 70%, 50%)",
  },
  
  {
    id: "Education",
    label: "Education",
    value: EduValue? EduValue : 0,
    color: "hsl(344, 70%, 50%)",
  },
  {
    id: "Others",
    label: "Others",
    value: otherValue ? otherValue : 0,
    color: "hsl(229, 70%, 50%)",
  }
];

const CustomTooltip = ({ datum }) => {
  return (
    <div className="custom-tooltip">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '10px', height: '10px', backgroundColor: datum.color, marginRight: '5px' }}></div>
        <p>{datum.label}: {parseFloat(datum.value).toFixed(2)} {userData.currency}s</p>
      </div>
      <p>({(datum.value / pieData.reduce((acc, d) => acc + d.value, 0) * 100).toFixed(2)}%)</p>
    </div>
  );
};

  return (
    <ResponsivePie
      data={pieData}
      // tooltip={CustomTooltip}
    
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
            background: '#FFFFFF',
            color: '#333333',
            borderRadius: '5px',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
            padding: '10px',
          },
        },
      }}
      tooltip={CustomTooltip}


      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",

              },
            },
          ],
        },
      ]}
    />
  );
};

export default Pie;
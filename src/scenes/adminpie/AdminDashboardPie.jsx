import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import './CustomTooltip.css'; 

const AdminDashboardPie = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user list
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userResponse = await axios.get('http://localhost:3000/account/all');
        console.log("Fetched Users:", userResponse.data); // Debug log
        setUsers(userResponse.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Process user data for the pie chart
  useEffect(() => {
    const processPieData = () => {
      const currencyCounts = {
        Knut: 0,
        Galleon: 0,
        Sickle: 0,
      };

      for (const user of users) {
        if (currencyCounts[user.currency] !== undefined) {
          currencyCounts[user.currency]++;
        }
      }

      setPieData([
        { id: "Knut", label: "Knut", value: currencyCounts.Knut },
        { id: "Galleon", label: "Galleon", value: currencyCounts.Galleon },
        { id: "Sickle", label: "Sickle", value: currencyCounts.Sickle },
      ]);
      console.log("Pie Data:", [
        { id: "Knut", label: "Knut", value: currencyCounts.Knut },
        { id: "Galleon", label: "Galleon", value: currencyCounts.Galleon },
        { id: "Sickle", label: "Sickle", value: currencyCounts.Sickle },
      ]); // Debug log
    };

    if (users.length > 0) {
      processPieData();
    }
  }, [users]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const CustomTooltip = ({ datum }) => {
    return (
      <div className="custom-tooltip">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: datum.color, marginRight: '5px' }}></div>
          <p>{datum.label}: {datum.value} User(s)</p>
        </div>
        <p>({(datum.value / pieData.reduce((acc, d) => acc + d.value, 0) * 100).toFixed(2)}%)</p>
      </div>
    );
  };

  return (
    <div style={{ height: '85%', width: '100%' }}>
      <ResponsivePie
        data={pieData}
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
                  itemTextColor: "#fff",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default AdminDashboardPie;

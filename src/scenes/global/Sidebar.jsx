import { useState } from "react";
// import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Menu } from "react-pro-sidebar";
import { ProSidebar } from "react-pro-sidebar";
import { MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import 'react-pro-sidebar/dist/css/styles.css';
import { tokens } from "../../theme";
import HomeIcon from '@mui/icons-material/Home';import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import PaidIcon from '@mui/icons-material/Paid';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
// import { useSession } from "../../SessionContext";
import { useAuth } from "../../AuthProvider";
import GetUserAvatar from "../../GetUserAvatar";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const { isLoggedIn, userData } = useAuth();
  

  // const { sessionData } = useSession();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [username, setUsername] = useState('');
  const [account_type, setAccount_type] = useState('Platinum Patronus');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  // const imageSrc = GetUserAvatar(userData.account_number);


  // setUsername(sessionData.username);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background:`linear-gradient(to top, ${colors.primary[400]}, ${colors.primary[500]}) !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Magical User
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              {/* <Box display="flex" justifyContent="center" alignItems="center" width="100px" height="100px" borderRadius="50%" overflow="hidden"> */}
                {/* <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  
                  src={imageSrc || `../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                /> */}
                
                  {/* <GetUserAvatar accountNumber={userData.account_number} />
              </Box> */}
                      <div className="avatar" style={{"marginLeft" : "67px"}}>
          <GetUserAvatar accountNumber={userData.account_number} />
        </div>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userData.username}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {userData.account_type}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
            To-Do
            </Typography>
            <Item
              title="Make Transaction"
              to="/transaction"
              icon={<ImportExportIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Top Up Balance"
              to="/topup"
              icon={<PaidIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Transcation History"
              to="/transactionHistory"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
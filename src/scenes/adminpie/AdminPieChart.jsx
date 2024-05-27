import { Box } from "@mui/material";
import Header from "../../components/Header";
import AdminPie from "./AdminPie";

const AdminPieChart = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Your Daily Expenses" />
      <Box height="75vh">
        <AdminPie />
      </Box>
    </Box>
  );
};

export default AdminPieChart;
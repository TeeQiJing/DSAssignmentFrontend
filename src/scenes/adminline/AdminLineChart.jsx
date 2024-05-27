import { Box } from "@mui/material";
import Header from "../../components/Header";
import AdminLine from "./AdminLine";

const AdminLineChart = () => {
  return (
    <Box m="20px" >
      <Header title="Line Chart" subtitle="Your Transaction History" />
      <Box height="75vh">
        <AdminLine />
      </Box>
    </Box>
  );
};

export default AdminLineChart;
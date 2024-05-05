import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { AdminPanelSettingsOutlinedIcon } from "@mui/icons-material/AdminPanelSettingsOutlined";
import { LockOpenOutlinedIcon } from "@mui/icons-material/LockOpenOutlined";
import { SecurityOutlinedIcon } from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useState } from "react";



const History = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [transaction, setTransaction] = useState([]);
    const columns = [
        {field: "transaction_id", headerName: "ID"},
    ]
    return (
        <Box>
            <Header title="HISTORY" subtitle="View your Transaction History"/>
            <Box>
                <DataGrid 
                    rows={transaction}
                    columns={columns}
                />
            </Box>
        </Box>
    )
}


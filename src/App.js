import { ColorModeContext, useMode } from "./theme";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard/Dashboard";
import TransactionHistory from "./scenes/transactionHistory/TransactionHistory";
import Transaction from "./scenes/transaction/Transaction";
import Transfer from "./scenes/transaction/Transfer";
import AddContact from "./scenes/transaction/AddContact";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{backgroundImage: "none"}}>
          <Sidebar/>
          <main className="content">
            <Topbar/>
            <Routes>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/transaction/transfer" element={<Transfer />} />
              <Route path="/transaction/addContact" element={<AddContact />} />
              <Route path="/transactionHistory" element={<TransactionHistory />} />
              {/* Other routes */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>

    </ColorModeContext.Provider>
  );
}

export default App;
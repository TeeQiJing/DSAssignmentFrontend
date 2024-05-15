import { ColorModeContext, useMode } from "./theme";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard/Dashboard";
import TransactionHistory from "./scenes/transactionHistory/TransactionHistory";
import Transaction from "./scenes/transaction/Transaction";
import Transfer from "./scenes/transaction/Transfer";
import AddContact from "./scenes/transaction/AddContact";
// import { SessionProvider, useSession } from "./SessionContext";
import { useAuth } from "./AuthProvider";
import PieChart from "./scenes/pie/PieChart";
import LineChart from "./scenes/line/LineChart";


function App() {
  const [theme, colorMode] = useMode();
  const { isLoggedIn, userData } = useAuth();
  // const { sessionData } = useSession();

  // console.log(sessionData);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {isLoggedIn && userData && (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <div className="app" style={{ backgroundImage: "none" }}>
              <Sidebar />
              <main className="content">
                <Topbar />
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/transaction" element={<Transaction />} />
                  <Route path="/transaction/transfer" element={<Transfer />} />
                  <Route path="/piechart" element={<PieChart />} />
                  <Route path="/linechart" element={<LineChart />} />
                  <Route
                    path="/transaction/addContact"
                    element={<AddContact />}
                  />
                  <Route
                    path="/transactionHistory"
                    element={<TransactionHistory />}
                  />
                  {/* Other routes */}
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      )}
    </div>
  );
}

export default App;

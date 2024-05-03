import { ColorModeContext, useMode } from "./theme";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
// import Transaction from "./scenes/transaction";
// import History from "./scenes/history";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
// import Calendar from "./scenes/calendar"

import LoginForm from './components/LoginForm/LoginForm';
import Pg1 from './components/RegisterForm/Pg1';
import Pg2 from './components/RegisterForm/Pg2';
import Pg3 from './components/RegisterForm/Pg3';

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
              {/* <Route path="/team" element={<Team/>}/> */}
              {/* <Route path="/contacts" element={<Contacts/>}/> */}
              {/* <Route path="/invoices" element={<Invoices/>}/> */}
              {/* <Route path="/form" element={<Form/>}/> */}
              {/* <Route path="/bar" element={<Bar/>}/> */}
              {/* <Route path="/pie" element={<Pie/>}/> */}
              {/* <Route path="/line" element={<Line/>}/> */}
              {/* <Route path="/geography" element={<Geography/>}/> */}
              {/* <Route path="/faq" element={<FAQ/>}/> */}
              {/* <Route path="/calendar" element={<Calendar/>}/> */}

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;

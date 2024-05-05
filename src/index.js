import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import Pg1 from "./components/RegisterForm/Pg1";
import { ToastContainer } from "react-toastify";
import Pg3 from "./components/RegisterForm/Pg3";
import Pg2 from "./components/RegisterForm/Pg2";
import FileUploadComponent from "./components/FileUploadComponent";
import Parent from "./components/RegisterForm/Parent";
import { FileDataProvider } from "./FileDataContext";
import GetImg from "./GetImg";

import { Login } from "@mui/icons-material";
import { SessionProvider } from "./SessionContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SessionProvider>
    <FileDataProvider>
    <BrowserRouter>

    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginForm />} />
        
          <Route path="/register/*" element={<Parent />} />
          <Route path="/image/" element={<GetImg />} />

      </Routes>
      {/* <App/> */}
        
         {/* <FileUploadComponent/> */}
    </BrowserRouter>

    </FileDataProvider>
    </SessionProvider>
  </React.StrictMode>

);
// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LoginForm />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/register/*" element={<Parent />} />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import Pg1 from "./components/RegisterForm/Pg1";
import Pg2 from "./components/RegisterForm/Pg2";
import Pg3 from "./components/RegisterForm/Pg3";
import { Login } from "@mui/icons-material";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Routes> */}
        {/* <Route path="/" element={<App/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/register" element={<Pg1/>}/>
        
              </Routes> */}
              <App/>
    </BrowserRouter>
    {/* <App/> */}
  </React.StrictMode>
);

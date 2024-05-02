import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import Pg1 from "./components/RegisterForm/Pg1";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/register" element={<Pg1/>}/>
        
              </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

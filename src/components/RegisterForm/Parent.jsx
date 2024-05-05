import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Pg1 from "./Pg1";
import Pg2 from "./Pg2";
import Pg3 from "./Pg3";

function Parent() {
  const [userData, setUserData] = useState({
    username: "",
    dob: "",
    email: "",
    contact: "",
    address: "",
  });
  const [accountData, setAccountData] = useState({
    accountNumber: "",
    password: "",
    securePhrase: "",
    balance: 0,
    file: null,
    avatar: null,
  });
  const [cardData, setCardData] = useState({
    cardNum: "",
    pin: "",
    cardType: "",
    cvv: "",
    expiryDate: "",
  });

  return (
    <Routes>
      <Route path="/" element={<Navigate to="page1" replace />} />
      <Route
        path="/page1"
        element={<Pg1 userData={userData} setUserData={setUserData} />}
      />
      <Route
        path="/page2"
        element={
          <Pg2 accountData={accountData} setAccountData={setAccountData} />
        }
      />
      <Route
        path="/page3"
        element={
          <Pg3
            userData={userData}
            accountData={accountData}
            cardData={cardData}
            setCardData={setCardData}
          />
        }
      />
    </Routes>
  );
}

export default Parent;

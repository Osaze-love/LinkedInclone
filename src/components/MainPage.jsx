import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Main";
import "./MainPage.css";
import SignIn from "./SignIn";
import Join from "./Join";

function MainPage() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="signIn" element={<SignIn />} />
      <Route path="join" element={<Join />} />
    </Routes>
  );
}

export default MainPage;

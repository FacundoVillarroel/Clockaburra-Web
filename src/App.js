// src/App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/header/Header";
import Login from "./screens/login/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("IS LOGGED IN ?: ", isLoggedIn);

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={() => null} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/employees" element={() => null} />
        <Route path="/shifts" element={() => null} />
        <Route path="/statistics" element={() => null} />
        <Route path="/aboutUs" element={() => null} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

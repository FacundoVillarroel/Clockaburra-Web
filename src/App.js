import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./screens/home/Home";
import Login from "./screens/login/Login";
import Register from "./screens/register/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("IS LOGGED IN ?: ", isLoggedIn);

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/employees" element={() => null} />
        <Route path="/shifts" element={() => null} />
        <Route path="/statistics" element={() => null} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

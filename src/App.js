import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Employees from "./pages/employees/Employees";
import Shifts from "./pages/shifts/Shifts";
import Timesheets from "./pages/timesheets/Timesheets";
import Statistics from "./pages/statistics/Statistics";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Navigate to /employees if token */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/employees"
            element={
              <PrivateRoute>
                <Employees />
              </PrivateRoute>
            }
          />
          <Route
            path="/shifts"
            element={
              <PrivateRoute>
                <Shifts />
              </PrivateRoute>
            }
          />
          <Route
            path="/timesheets"
            element={
              <PrivateRoute>
                <Timesheets />
              </PrivateRoute>
            }
          />
          <Route
            path="/statistics"
            element={
              <PrivateRoute>
                <Statistics />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

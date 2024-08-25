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
import PublicRoute from "./components/publicRoute/PublicRoute";
import AuthProvider from "./components/authProvider/AuthProvider";
import LinkToApp from "./pages/linkToApp/LinkToApp";
import EmailValidation from "./pages/emailValidation/EmailValidation";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/employees/*"
              element={
                <PrivateRoute>
                  <Employees />
                </PrivateRoute>
              }
            />
            <Route
              path="/shifts/*"
              element={
                <PrivateRoute>
                  <Shifts />
                </PrivateRoute>
              }
            />
            <Route
              path="/timesheets/*"
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
            <Route path="/app-for-employees-link" element={<LinkToApp />} />
            <Route path="/validation" element={<EmailValidation />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

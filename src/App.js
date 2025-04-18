import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Employees from "./pages/employees/Employees";
import Shifts from "./pages/shifts/Shifts";
import Timesheets from "./pages/timesheets/Timesheets";
import Manage from "./pages/manage/Manage";
import Footer from "./components/footer/Footer";
import PublicRoute from "./components/publicRoute/PublicRoute";
import AuthProvider from "./components/authProvider/AuthProvider";
import LinkToApp from "./pages/linkToApp/LinkToApp";
import EmailValidation from "./pages/emailValidation/EmailValidation";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import ScreenSizeRedirect from "./components/screenSizeRedirect/ScreenSizeRedirect";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <ScreenSizeRedirect />
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <Home />
                  </PublicRoute>
                }
              />
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
                path="/reset-password/*"
                element={
                  <PublicRoute>
                    <ResetPassword />
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
                path="/manage/*"
                element={
                  <PrivateRoute>
                    <Manage />
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
    </GoogleOAuthProvider>
  );
}

export default App;

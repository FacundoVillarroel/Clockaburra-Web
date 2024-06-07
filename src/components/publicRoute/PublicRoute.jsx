import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);

  if (user === "employee") {
    return <Navigate to="/app-for-employees-link" />;
  }

  return !token ? children : <Navigate to="/employees" />;
};

export default PublicRoute;

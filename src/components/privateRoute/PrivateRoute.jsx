import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../ui/loading/Loading";

const PrivateRoute = ({ children }) => {
  const { token, status, user } = useSelector((state) => state.auth);

  const renderContent = () => {
    if (status === "loading") {
      return <Loading />;
    }

    if (!token) {
      return <Navigate to="/login" />;
    }

    if (user === "employee") {
      return <Navigate to="/app-for-employees-link" />;
    }

    return children;
  };

  return renderContent();
};

export default PrivateRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../ui/loading/Loading";

const PrivateRoute = ({ children }) => {
  const { token, status } = useSelector((state) => state.auth);

  return status === "loading" ? (
    <Loading />
  ) : token ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;

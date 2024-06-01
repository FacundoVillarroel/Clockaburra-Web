import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../ui/loading/Loading";

const PublicRoute = ({ children }) => {
  const { token, status } = useSelector((state) => state.auth);

  return status === "loading" ? (
    <Loading />
  ) : !token ? (
    children
  ) : (
    <Navigate to="/employees" />
  );
};

export default PublicRoute;

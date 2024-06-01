import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { validateToken } from "../../store/reducers/authSlice";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validateToken());
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;

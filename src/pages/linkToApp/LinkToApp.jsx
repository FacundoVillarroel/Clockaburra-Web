import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/reducers/authSlice";

const LinkToApp = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log("USER ROLE: ", user);

  useEffect(() => {
    if (user === "employee") {
      dispatch(logout());
    }
  }, [user, dispatch]);

  return <div>LinkToApp</div>;
};

export default LinkToApp;

import React, { useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrganizations } from "../../store/reducers/organizationSlice";

import { HeaderContainer } from "./Header.styles";

const Header = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const role = user?.role;
    if (
      role === "Assistant manager" ||
      role === "Manager" ||
      role === "Admin"
    ) {
      dispatch(fetchOrganizations(token));
    }
  }, [user, dispatch, token]);

  return (
    <HeaderContainer>
      <Navbar />
    </HeaderContainer>
  );
};

export default Header;

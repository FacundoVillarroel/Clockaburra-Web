import React from "react";
import { useDispatch, useSelector } from "react-redux";

import CustomNavLink from "./customNavLink/CustomNavLink";
import { FaUserCircle } from "react-icons/fa";
import Colors from "../../constants/Colors";
import { logout } from "../../store/reducers/authSlice";

import {
  NavbarContainer,
  LogoContainer,
  LogoImage,
  LogoText,
  NavLinks,
} from "./Navbar.styles";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <NavbarContainer>
      <LogoContainer to="/">
        <LogoImage src="/logoClockaburra.png" alt="Logo Clockaburra" />
        <LogoText>Clockaburra</LogoText>
      </LogoContainer>
      <NavLinks>
        {token ? (
          <>
            <CustomNavLink to="/employees">Employees</CustomNavLink>
            <CustomNavLink to="/shifts">Shifts</CustomNavLink>
            <CustomNavLink to="/timesheets">Timesheets</CustomNavLink>
            <CustomNavLink to="/manage/roles">
              Manage Roles & Departments
            </CustomNavLink>
            <CustomNavLink to="/" onClick={handleLogout}>
              Logout
            </CustomNavLink>
          </>
        ) : (
          <>
            <CustomNavLink
              to="/login"
              color={Colors.primary}
              bg_color={"#fff"}
              hover_color={"#fff"}
              hover_bg_color={Colors.primary}
            >
              <FaUserCircle />
              <div>Login</div>
            </CustomNavLink>
            <CustomNavLink
              to="/register"
              border={`2px solid ${Colors.accent}`}
              color={Colors.accent}
              hover_border={"2px solid #fff"}
              hover_color={"#fff"}
            >
              Start Now, its free!
            </CustomNavLink>
          </>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;

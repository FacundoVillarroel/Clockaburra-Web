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
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split("/")[1];

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
        {user && user.permissions === "admin" ? (
          <>
            <CustomNavLink
              to="/employees"
              color={path === "employees" ? Colors.accent : ""}
            >
              Employees
            </CustomNavLink>
            <CustomNavLink
              to="/shifts"
              color={path === "shifts" ? Colors.accent : ""}
            >
              Shifts
            </CustomNavLink>
            <CustomNavLink
              to="/timesheets"
              color={path === "timesheets" ? Colors.accent : ""}
            >
              Timesheets
            </CustomNavLink>
            <CustomNavLink
              to="/manage/roles"
              color={path === "manage" ? Colors.accent : ""}
            >
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

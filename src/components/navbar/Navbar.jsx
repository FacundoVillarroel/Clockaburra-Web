import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import CustomNavLink from "./customNavLink/CustomNavLink";
import { FaUserCircle } from "react-icons/fa";
import Colors from "../../constants/Colors";
import { logout } from "../../store/reducers/authSlice";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5rem 1rem 3rem;
  background-color: #111f4d;
  color: white;
  position: fixed;
  top: 0;
  box-sizing: border-box;
  width: 100%;
`;

const LogoContainer = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 4rem;
  margin-right: 0.8rem;
`;

const LogoText = styled.p`
  font-size: 1.5rem;
  color: white;
`;

const NavLinks = styled.div`
  display: flex;
`;

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
            <CustomNavLink to="/statistics">Statistics</CustomNavLink>
            <CustomNavLink to="/" onClick={handleLogout}>
              Logout
            </CustomNavLink>
          </>
        ) : (
          <>
            <CustomNavLink
              to="/login"
              color={Colors.primary}
              bgColor={"#fff"}
              hoverColor={"#fff"}
              hoverBgColor={Colors.primary}
            >
              <FaUserCircle />
              <div>Login</div>
            </CustomNavLink>
            <CustomNavLink
              to="/register"
              border={`2px solid ${Colors.accent}`}
              color={Colors.accent}
              hoverBorder={"2px solid #fff"}
              hoverColor={"#fff"}
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

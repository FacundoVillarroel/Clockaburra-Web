import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { FaUserCircle } from "react-icons/fa";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5rem;
  background-color: #111f4d;
  color: white;
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

const NavLinkStyled = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  text-decoration: none;
  color: white;
  cursor: pointer;
`;

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <NavbarContainer>
      <LogoContainer to="/">
        <LogoImage src="/logoClockaburra.png" alt="Logo Clockaburra" />
        <LogoText>Clockaburra</LogoText>
      </LogoContainer>
      <NavLinks>
        {isLoggedIn ? (
          <>
            <NavLinkStyled to="/employees">Employees</NavLinkStyled>
            <NavLinkStyled to="/shifts">Shifts</NavLinkStyled>
            <NavLinkStyled to="/timesheets">Timesheets</NavLinkStyled>
            <NavLinkStyled to="/statistics">Statistics</NavLinkStyled>
            <NavLinkStyled to="/" onClick={() => setIsLoggedIn(false)}>
              Logout
            </NavLinkStyled>
          </>
        ) : (
          <>
            <NavLinkStyled to="/login">
              <FaUserCircle />
              Login
            </NavLinkStyled>
            <NavLinkStyled to="/register">Start Now, its free!</NavLinkStyled>
          </>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;

import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavbarContainer = styled.nav`
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

export const LogoContainer = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`;

export const LogoImage = styled.img`
  width: 4rem;
  margin-right: 0.8rem;
`;

export const LogoText = styled.p`
  font-size: 1.5rem;
  color: white;
`;

export const NavLinks = styled.div`
  display: flex;
`;

import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Colors from "../../../constants/Colors";

const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.padding || ".5rem .8rem"};
  margin-left: ${(props) => props.marginLeft || "1rem"};
  text-decoration: ${(props) => props.textDecoration || "none"};
  color: ${(props) => props.color || "#fff"};
  background-color: ${(props) => props.bgColor || Colors.primary};
  border-radius: ${(props) => props.borderRadius || "1rem"};
  border: ${(props) => props.border || "0px solid #fff"};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.hoverColor || Colors.accent};
    background-color: ${(props) => props.hoverBgColor || Colors.primary};
    border: ${(props) => props.hoverBorder || "0px solid #fff"};
  }
`;

const ChildrenContainer = styled.div`
  display: "flex";
  gap: ".6rem";
  align-items: "center";
`;

const CustomNavLink = ({ to, onClick, children, ...props }) => {
  return (
    <StyledNavLink to={to} onClick={onClick} {...props}>
      <ChildrenContainer
        style={{ display: "flex", gap: ".4rem", alignItems: "center" }}
      >
        {children}
      </ChildrenContainer>
    </StyledNavLink>
  );
};

export default CustomNavLink;

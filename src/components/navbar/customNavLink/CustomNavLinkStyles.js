import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Colors from "../../../constants/Colors";

export const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.padding || ".5rem .8rem"};
  margin-left: ${(props) => props.marginLeft || "1rem"};
  text-decoration: ${(props) => props.textDecoration || "none"};
  color: ${(props) => props.color || "#fff"};
  background-color: ${(props) => props.bg_color || Colors.primary};
  border-radius: ${(props) => props.borderRadius || "1rem"};
  border: ${(props) => props.border || "0px solid #fff"};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.hover_color || Colors.accent};
    background-color: ${(props) => props.hover_bg_color || Colors.primary};
    border: ${(props) => props.hover_border || "0px solid #fff"};
  }
`;

export const ChildrenContainer = styled.div`
  display: "flex";
  gap: ".6rem";
  align-items: "center";
`;

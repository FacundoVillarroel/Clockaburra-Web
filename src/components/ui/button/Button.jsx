import React from "react";
import styled from "styled-components";

import Colors from "../../../constants/Colors";

const StyledButton = styled.button`
  background-color: ${(props) => props.bgColor || Colors.primary};
  color: ${(props) => props.color || "#fff"};
  padding: ${(props) => props.padding || ".6rem 1.4rem"};
  border: none;
  border-radius: ${(props) => props.borderRadius || ".4rem"};
  font-size: ${(props) => props.fontSize || "1.2rem"};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hoverBgColor || Colors.secondary};
  }
`;

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;

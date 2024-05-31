import React from "react";

import { StyledButton } from "./Button.styles";

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;

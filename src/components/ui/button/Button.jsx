import React from "react";

import { StyledButton } from "./ButtonStyles.js";

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;

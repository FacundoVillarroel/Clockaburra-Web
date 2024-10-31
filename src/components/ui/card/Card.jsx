import React from "react";

import { StyledCard } from "./Cart.styles.js";

const Card = ({ children, ...props }) => {
  return <StyledCard {...props}>{children}</StyledCard>;
};

export default Card;

import React from "react";

import { StyledCard } from "./CartStyles.js";

const Card = ({ children, ...props }) => {
  return <StyledCard {...props}>{children}</StyledCard>;
};

export default Card;

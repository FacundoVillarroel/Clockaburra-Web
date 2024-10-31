import React from "react";

import { StyledNavLink, ChildrenContainer } from "./CustomNavLinkStyles.js";

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

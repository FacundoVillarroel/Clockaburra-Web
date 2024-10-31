import React from "react";

import { Div, FooterContainer } from "./FooterStyles.js";

const Footer = () => {
  return (
    <Div>
      <FooterContainer>
        &copy; {new Date().getFullYear()} Clockaburra. All rights reserved.
      </FooterContainer>
    </Div>
  );
};

export default Footer;

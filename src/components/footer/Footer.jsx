import React from "react";

import { Div, FooterContainer } from "./Footer.styles.js";

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

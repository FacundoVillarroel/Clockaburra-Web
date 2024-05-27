import React from "react";
import styled from "styled-components";

const Div = styled.footer`
  margin-top: 1rem;
`;

const FooterContainer = styled.div`
  padding: 20px;
  background-color: #111f4d;
  text-align: center;
  color: white;
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 0;
`;

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

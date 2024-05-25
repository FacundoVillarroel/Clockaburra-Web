import React from "react";
import styled from "styled-components";

const Container = styled.footer`
  padding: 20px;
  background-color: #111f4d;
  text-align: center;
  color: white;
`;

const Footer = () => {
  return (
    <Container>
      &copy; {new Date().getFullYear()} Clockaburra. All rights reserved.
    </Container>
  );
};

export default Footer;

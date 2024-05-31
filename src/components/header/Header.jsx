import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../navbar/Navbar";
import styled from "styled-components";

const HeaderContainer = styled.header`
  margin-bottom: 7rem;
`;

const Header = () => {
  const { token, status } = useSelector((state) => state.auth);
  console.log("Token: ", token);
  console.log("Status: ", status);

  return (
    <HeaderContainer>
      <Navbar />
    </HeaderContainer>
  );
};

export default Header;

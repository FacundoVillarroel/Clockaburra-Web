import React from "react";
import Navbar from "../navbar/Navbar";
import styled from "styled-components";

const HeaderContainer = styled.header`
  margin-bottom: 7rem;
`;

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <HeaderContainer>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </HeaderContainer>
  );
};

export default Header;

import React from "react";
import Navbar from "../navbar/Navbar";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <header>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </header>
  );
};

export default Header;

import React, { useRef } from "react";
import logo from "../../../img/logoClockaburra.png";

import { RootContainer, Image, Text } from "./Loading.styles";

const Loading = ({ propStyles = {} }) => {
  const spinValue = useRef(null);

  return (
    <RootContainer style={propStyles.rootContainer}>
      <Image
        ref={spinValue}
        src={logo}
        alt="Loading"
        style={propStyles.image}
      />
      <Text style={propStyles.text}>Loading...</Text>
    </RootContainer>
  );
};

export default Loading;

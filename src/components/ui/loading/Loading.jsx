import React, { useRef } from "react";
import styled from "styled-components";
import logo from "../../../img/logoClockaburra.png";

import Colors from "../../../constants/Colors";

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Image = styled.img`
  height: 175px;
  width: 175px;
  animation: spin 5s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Text = styled.p`
  margin-top: 20px;
  color: ${Colors.primary}
  font-size: 20px;
`;

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

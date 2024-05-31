import styled from "styled-components";
import Colors from "../../../constants/Colors";

export const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Image = styled.img`
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

export const Text = styled.p`
  margin-top: 20px;
  color: ${Colors.primary}
  font-size: 20px;
`;

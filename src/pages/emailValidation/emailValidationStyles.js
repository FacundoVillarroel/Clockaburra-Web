import styled from "styled-components";
import Colors from "../../constants/Colors";

export const RootContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  color: ${Colors.primary};
  font-size: 2.5rem;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Subtitle = styled.h3`
  font-size: 1.5rem;
`;

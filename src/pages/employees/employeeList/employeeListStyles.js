import styled from "styled-components";
import Colors from "../../../constants/Colors";

export const IconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ActionBarContainer = styled.div`
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const ActionBarButtonContainer = styled.div`
  border-radius: 1rem;
  padding: 0.5rem;
  margin-right: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.active ? Colors.accent : "white")};
  color: ${Colors.primary};
  border: 2px solid ${Colors.primary};
  cursor: pointer;
`;

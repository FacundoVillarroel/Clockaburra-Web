import styled from "styled-components";
import Colors from "../../../constants/Colors";

export const Title = styled.h1`
  text-align: center;
`;

export const ActionBarContainer = styled.div`
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  > *:not(:last-child) {
    margin-right: 3rem;
  }

  > *:last-child {
    margin-left: auto;
  }
`;

export const ActionBarButtonContainer = styled.div`
  border-radius: 1rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.active ? Colors.accent : "white")};
  color: ${Colors.primary};
  border: 2px solid ${Colors.primary};
  cursor: pointer;
`;

export const AddShiftButton = styled.div`
  border-radius: 1rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.primary};
  color: white;
  border: 2px solid white;
  cursor: pointer;
`;

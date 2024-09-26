import styled from "styled-components";
import Colors from "../../constants/Colors";

export const MonthSelectorContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.label`
  padding-right: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border-radius: 1rem;
  border-color: ${Colors.primary};
`;

export const ControlArrow = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  min-height: 2rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  border-radius: 1rem;
  border: 2px solid ${Colors.primary};
`;

import styled from "styled-components";
import Colors from "../../constants/Colors";

export const ShiftsContainer = styled.div`
  max-width: 70rem;
  margin: 7rem auto 4rem auto;
  padding: 2rem;
`;

export const Title = styled.h1`
  text-align: center;
`;

export const CellContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CellContent = styled.div`
  margin: 0;
  border: 1.3px solid ${(props) => props.color || Colors.secondary};
  border-radius: 10px;
  padding: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  align-self: center;
  font-size: 0.7rem;
  font-weight: bold;
  color: ${(props) => props.color || Colors.secondary};
  cursor: pointer;
`;

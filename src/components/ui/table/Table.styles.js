import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const StyledTh = styled.th`
  background-color: ${(props) => props.bgColor || "#f2f2f2"};
  color: ${(props) => props.color || "#000"};
  padding: ${(props) => props.padding || ".8rem"};
  border: ${(props) => props.border || "1px solid #ddd"};
`;

export const StyledTd = styled.td`
  padding: ${(props) => props.padding || ".8rem"};
  border: ${(props) => props.border || "1px solid #ddd"};
`;

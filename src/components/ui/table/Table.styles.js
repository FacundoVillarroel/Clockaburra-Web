import styled from "styled-components";
import Colors from "../../../constants/Colors";

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const StyledTh = styled.th`
  background-color: ${(props) => props.bgColor || Colors.primary};
  color: ${(props) => props.color || "#fff"};
  padding: ${(props) => props.padding || ".8rem"};
  border: ${(props) => props.border || "1px solid #ddd"};
`;

export const StyledTd = styled.td`
  padding: ${(props) => props.padding || ".8rem"};
  border: ${(props) => props.border || "1px solid #ddd"};
  cursor: ${(props) => props.cursor || "default"};
`;

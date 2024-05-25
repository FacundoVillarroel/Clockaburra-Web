import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTh = styled.th`
  background-color: ${(props) => props.bgColor || "#f2f2f2"};
  color: ${(props) => props.color || "#000"};
  padding: ${(props) => props.padding || ".8rem"};
  border: ${(props) => props.border || "1px solid #ddd"};
`;

const StyledTd = styled.td`
  padding: ${(props) => props.padding || ".8rem"};
  border: ${(props) => props.border || "1px solid #ddd"};
`;

const Table = ({ columns, data }) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <StyledTh key={index}>{col}</StyledTh>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <StyledTd key={colIndex}>{row[col]}</StyledTd>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;

import React from "react";

import { StyledTable, StyledTh, StyledTd } from "./Table.styles";

const Table = ({ columns, data, onRowClick }) => {
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
          <tr key={rowIndex} onClick={() => onRowClick(row)}>
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

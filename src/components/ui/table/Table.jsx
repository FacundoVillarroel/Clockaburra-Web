import React from "react";
import { StyledTable, StyledTh, StyledTd } from "./Table.styles";

const Table = ({ columns, data, onRowClick = () => {}, cursor }) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <StyledTh key={index}>{col.header}</StyledTh>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} onClick={() => onRowClick(row)}>
            {columns.map((col, colIndex) => (
              <StyledTd cursor={cursor} key={colIndex}>
                {col.render
                  ? col.render(row[col.accessor], row)
                  : row[col.accessor]}
              </StyledTd>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;

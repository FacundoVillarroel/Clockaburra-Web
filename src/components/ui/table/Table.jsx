import React from "react";
import { StyledTable, StyledTr, StyledTh, StyledTd } from "./TableStyles.js";

const Table = ({
  columns,
  data,
  onRowClick = () => {},
  onCellClick = () => {},
  cursor,
}) => {
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
          <StyledTr key={rowIndex} onClick={() => onRowClick(row, rowIndex)}>
            {columns.map((col, colIndex) => (
              <StyledTd
                cursor={cursor}
                key={colIndex}
                onClick={(e) => {
                  e.stopPropagation();
                  onCellClick(row[col.accessor], row, colIndex, rowIndex);
                }}
              >
                {col.render
                  ? col.render(row[col.accessor], row)
                  : row[col.accessor]}
              </StyledTd>
            ))}
          </StyledTr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;

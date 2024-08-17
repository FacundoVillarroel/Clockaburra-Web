import React from "react";
import { StyledTable, StyledTh, StyledTd } from "./Table.styles";

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
          <tr key={rowIndex} onClick={() => onRowClick(row, rowIndex)}>
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
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;

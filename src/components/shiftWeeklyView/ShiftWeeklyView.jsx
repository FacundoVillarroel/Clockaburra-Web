import React from "react";

import Table from "../ui/table/Table";

import { CellContainer, CellContent } from "./shiftWeeklyView.styles";

const renderShiftCell = (value, row) => {
  return (
    <CellContainer>
      <CellContent color={value ? null : "black"}>
        {value ? `${value.startTime} ${value.endTime}` : "No Shift"}
      </CellContent>
    </CellContainer>
  );
};

const ShiftWeeklyView = ({ employees }) => {
  const columns = [
    { header: "Employee", accessor: "employee" },
    { header: "Role", accessor: "role" },
    {
      header: "Mon",
      accessor: "mon",
      render: renderShiftCell,
    },
    {
      header: "Tue",
      accessor: "tue",
      render: renderShiftCell,
    },
    {
      header: "Wed",
      accessor: "wed",
      render: renderShiftCell,
    },
    {
      header: "Thu",
      accessor: "thu",
      render: renderShiftCell,
    },
    {
      header: "Fri",
      accessor: "fri",
      render: renderShiftCell,
    },
    {
      header: "Sat",
      accessor: "sat",
      render: renderShiftCell,
    },
    {
      header: "Sun",
      accessor: "sun",
      render: renderShiftCell,
    },
  ];

  return (
    <div>
      <Table columns={columns} data={employees} />
    </div>
  );
};

export default ShiftWeeklyView;

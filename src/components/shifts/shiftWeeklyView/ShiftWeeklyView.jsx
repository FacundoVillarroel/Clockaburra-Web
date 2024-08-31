import React from "react";
import { useNavigate } from "react-router-dom";

import Table from "../../ui/table/Table";

import { renderShiftCell, getDayOfWeek } from "../../../utils/tableHelpers";

const ShiftWeeklyView = ({ data, startDate }) => {
  const navigate = useNavigate();
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

  const onCellClick = (cellValue, row, colIndex, rowIndex) => {
    if (colIndex === 0 || colIndex === 1) {
      navigate(`/employees/details/${row.id}`);
    }
    if (colIndex < 2) {
      return;
    }
    const userId = row.id;
    const name = row.employee;
    const shiftId = cellValue ? cellValue.shiftId : null;
    let date = cellValue ? null : getDayOfWeek(colIndex, startDate);

    const queryParams = new URLSearchParams({
      userId,
      name,
      shiftId,
      date,
    }).toString();
    navigate(`/shifts/updateShift?${queryParams}`);
  };

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        onCellClick={onCellClick}
        cursor={"pointer"}
      />
    </div>
  );
};

export default ShiftWeeklyView;

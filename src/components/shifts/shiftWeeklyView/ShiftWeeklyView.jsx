import React from "react";
import { useNavigate } from "react-router-dom";

import Table from "../../ui/table/Table";

import {
  renderShiftCell,
  getDayOfWeek,
  renderTotalHours,
} from "../../../utils/tableHelpers";
import EmptyState from "../../emptyState/EmptyState";

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
    {
      header: "Total Hours",
      accessor: "totalHours",
      render: renderTotalHours,
    },
  ];

  const onCellClick = (cellValue, row, colIndex, rowIndex) => {
    if (colIndex === 0 || colIndex === 1) {
      navigate(`/employees/details/${row.id}`);
    }
    if (colIndex < 2 || colIndex > 8) {
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
      {data.length ? (
        <Table
          columns={columns}
          data={data}
          onCellClick={onCellClick}
          cursor={"pointer"}
        />
      ) : (
        <EmptyState message="No employees match your criteria" />
      )}
    </div>
  );
};

export default ShiftWeeklyView;

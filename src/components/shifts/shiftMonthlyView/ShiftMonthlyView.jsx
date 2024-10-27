import React from "react";

import Table from "../../ui/table/Table";

import {
  renderTotalHours,
  renderTotalWorkingDays,
} from "../../../utils/tableHelpers";
import EmptyState from "../../emptyState/EmptyState";

const ShiftMonthlyView = ({ data, startDate }) => {
  const columns = [
    { header: "Employee", accessor: "employee" },
    { header: "Role", accessor: "role" },
    {
      header: "Working Days",
      accessor: "workingDays",
      render: renderTotalWorkingDays,
    },
    { header: "Total Hours", accessor: "totalHours", render: renderTotalHours },
  ];

  const onRowClick = () => {};

  return (
    <div>
      {data.length ? (
        <Table columns={columns} data={data} onRowClick={onRowClick} />
      ) : (
        <EmptyState message="No employees match your criteria" />
      )}
    </div>
  );
};

export default ShiftMonthlyView;

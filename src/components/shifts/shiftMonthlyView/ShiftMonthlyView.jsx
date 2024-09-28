import React from "react";

import Table from "../../ui/table/Table";

import {
  renderTotalHours,
  renderTotalWorkingDays,
} from "../../../utils/tableHelpers";

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
      <Table columns={columns} data={data} onRowClick={onRowClick} />
    </div>
  );
};

export default ShiftMonthlyView;

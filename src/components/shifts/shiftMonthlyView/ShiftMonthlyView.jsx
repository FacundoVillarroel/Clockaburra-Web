import React from "react";

import Table from "../../ui/table/Table";

const ShiftMonthlyView = ({ data, startDate }) => {
  const columns = [
    { header: "Employee", accessor: "employee" },
    { header: "Role", accessor: "role" },
    { header: "Working Days", accessor: "workingDays" },
    { header: "Total Hours", accessor: "totalHours" },
  ];

  const onRowClick = () => {};

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        onRowClick={onRowClick}
        cursor="pointer"
      />
    </div>
  );
};

export default ShiftMonthlyView;

import React from "react";
import Table from "../../components/ui/table/Table";

const columns = [
  { header: "ID", accessor: "id" },
  { header: "Employee", accessor: "employee" },
  { header: "Date", accessor: "date" },
  { header: "Shift Start", accessor: "shiftStart" },
  { header: "Shift End", accessor: "shiftEnd" },
  { header: "Hours Worked", accessor: "hoursWorked" },
];

const data = [
  {
    id: "1",
    employee: "John Doe",
    date: "2024-05-20",
    shiftStart: "09:00 AM",
    shiftEnd: "05:00 PM",
    hoursWorked: 8,
  },
  {
    id: "2",
    employee: "Jane Smith",
    date: "2024-05-21",
    shiftStart: "10:00 AM",
    shiftEnd: "06:00 PM",
    hoursWorked: 8,
  },
  {
    id: "3",
    employee: "Alice Johnson",
    date: "2024-05-22",
    shiftStart: "08:00 AM",
    shiftEnd: "04:00 PM",
    hoursWorked: 8,
  },
  {
    id: "4",
    employee: "Bob Brown",
    date: "2024-05-23",
    shiftStart: "07:00 AM",
    shiftEnd: "03:00 PM",
    hoursWorked: 8,
  },
];

const Timesheets = () => {
  return (
    <div>
      <h1>Timesheets</h1>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Timesheets;

import React from "react";
import Table from "../../components/ui/table/Table";

const columns = [
  "ID",
  "Employee",
  "Date",
  "Shift Start",
  "Shift End",
  "Hours Worked",
];

const data = [
  {
    ID: "1",
    Employee: "John Doe",
    Date: "2024-05-20",
    "Shift Start": "09:00 AM",
    "Shift End": "05:00 PM",
    "Hours Worked": 8,
  },
  {
    ID: "2",
    Employee: "Jane Smith",
    Date: "2024-05-21",
    "Shift Start": "10:00 AM",
    "Shift End": "06:00 PM",
    "Hours Worked": 8,
  },
  {
    ID: "3",
    Employee: "Alice Johnson",
    Date: "2024-05-22",
    "Shift Start": "08:00 AM",
    "Shift End": "04:00 PM",
    "Hours Worked": 8,
  },
  {
    ID: "4",
    Employee: "Bob Brown",
    Date: "2024-05-23",
    "Shift Start": "07:00 AM",
    "Shift End": "03:00 PM",
    "Hours Worked": 8,
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

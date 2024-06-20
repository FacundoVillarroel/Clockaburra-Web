import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/ui/table/Table";
import { DateTime } from "luxon";

const EmployeeList = () => {
  const navigate = useNavigate();
  const columns = ["Name", "Surname", "Email", "Role", "Start Date"];

  const employees = [
    {
      address: "Guandacol 31",
      email: "facu.villarroel96@gmail.com",
      hourlyRate: 30,
      id: "facu.villarroel96@gmail.com",
      isRegistered: true,
      name: "Facundo",
      phoneNumber: 321321321,
      role: "employee",
      startDate: "2024-05-07T00:00:00.000-03:00",
      surname: "Villarroel",
      username: "facu.villarroel96@gmail.com",
    },
  ];

  const data = employees.map((employee) => ({
    Name: employee.name,
    Surname: employee.surname,
    Email: employee.email,
    Role: employee.role,
    "Start Date": DateTime.fromISO(employee.startDate).toFormat("dd LLL yyyy"),
    id: employee.id,
  }));

  const handleRowClick = (row) => {
    navigate(`/employees/details/${row.id}`);
  };

  return (
    <div>
      <Table columns={columns} data={data} onRowClick={handleRowClick} />
    </div>
  );
};

export default EmployeeList;

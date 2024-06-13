import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import EmployeeForm from "./employeeForm/EmployeeForm";
import { EmployeesContainer, Title } from "./employees.styles";

const Employees = () => {
  return (
    <EmployeesContainer>
      <Title>Employees</Title>
      <Link to="new">Add New Employee</Link>
      <Routes>
        <Route path="new" element={<EmployeeForm />} />
      </Routes>
    </EmployeesContainer>
  );
};

export default Employees;

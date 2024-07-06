import React from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeDetails from "./employeeDetails/EmployeeDetails";

import EmployeeForm from "./employeeForm/EmployeeForm";
import EmployeeList from "./employeeList/EmployeeList";
import {
  EmployeesContainer,
  Title,
  StyledLink,
  Content,
} from "./employees.styles";

const Employees = () => {
  return (
    <EmployeesContainer>
      <Title>Employees</Title>
      <StyledLink to="new">Add new employee</StyledLink>
      <StyledLink to="list">List of employees</StyledLink>
      <Content>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="new" element={<EmployeeForm />} />
          <Route path="list" element={<EmployeeList />} />
          <Route path="details/:id" element={<EmployeeDetails />} />
        </Routes>
      </Content>
    </EmployeesContainer>
  );
};

export default Employees;

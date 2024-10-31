import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import EmployeeDetails from "./employeeDetails/EmployeeDetails";

import EmployeeForm from "./employeeForm/EmployeeForm";
import EmployeeList from "./employeeList/EmployeeList";
import {
  EmployeesContainer,
  Title,
  StyledLink,
  Content,
} from "./employees.styles.js";

const Employees = () => {
  const { roles, departments } = useSelector((state) => state.organization);
  const rolesList = roles.map((role) => role.name);
  const departmentsList = departments.map((department) => department.name);

  return (
    <EmployeesContainer>
      <Title>Employees</Title>
      <StyledLink to="new">Add new employee</StyledLink>
      <StyledLink to="list">List of employees</StyledLink>
      <Content>
        <Routes>
          <Route
            path="/"
            element={
              <EmployeeList
                rolesList={rolesList}
                departmentsList={departmentsList}
              />
            }
          />
          <Route path="new" element={<EmployeeForm />} />
          <Route
            path="list"
            element={
              <EmployeeList
                rolesList={rolesList}
                departmentsList={departmentsList}
              />
            }
          />
          <Route path="details/:id" element={<EmployeeDetails />} />
        </Routes>
      </Content>
    </EmployeesContainer>
  );
};

export default Employees;

import React, { useState, useEffect, useCallback } from "react";
import { DateTime } from "luxon";

import { getCookie } from "../../../utils/cookies";
import Loading from "../../../components/ui/loading/Loading";
import {
  ActionBarContainer,
  ActionBarButtonContainer,
} from "./employeeListStyles.js";
import DropdownMenu from "../../../components/dropdownMenu/DropdownMenu";
import { buildQueryParams } from "../../../utils/buildQueryParams";
import EmployeesTable from "../../../components/employees/employeesTable/EmployeesTable";

const EmployeeList = ({ rolesList = [], departmentsList = [] }) => {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState(rolesList);
  const [departments, setDepartments] = useState(departmentsList);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const queryString = buildQueryParams({
        roles: roles.length ? roles : ["none"],
        departments: departments.length ? departments : ["none"],
      });
      const token = getCookie("token");
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users?${queryString}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const users = await response.json();
      setEmployees(formatData(users));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("EmployeeList", error);
    }
  }, [roles, departments]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (rolesList.length) {
      setRoles(rolesList);
    }
  }, [rolesList]);

  useEffect(() => {
    if (departmentsList.length) {
      setDepartments(departmentsList);
    }
  }, [departmentsList]);

  const formatData = (data) => {
    return data
      .filter((employee) => employee.role !== "employer")
      .map((employee) => ({
        name: employee.name,
        surname: employee.surname,
        email: employee.email,
        role: employee.role,
        startDate: DateTime.fromISO(employee.startDate).toFormat("dd LLL yyyy"),
        id: employee.id,
      }));
  };

  const setFilters = (identifier, values) => {
    if (identifier === "Roles") {
      setRoles(values);
    }
    if (identifier === "Departments") {
      setDepartments(values);
    }
  };

  return (
    <>
      <ActionBarContainer>
        <ActionBarButtonContainer>
          <DropdownMenu
            label="Roles"
            items={rolesList}
            setValues={setFilters}
            checked={roles}
          />
        </ActionBarButtonContainer>
        <ActionBarButtonContainer>
          <DropdownMenu
            label="Departments"
            items={departmentsList}
            setValues={setFilters}
            checked={departments}
          />
        </ActionBarButtonContainer>
      </ActionBarContainer>
      {loading ? (
        <Loading />
      ) : (
        <EmployeesTable employees={employees} setEmployees={setEmployees} />
      )}
    </>
  );
};

export default EmployeeList;

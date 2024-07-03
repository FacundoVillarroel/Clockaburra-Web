import React, { useEffect, useState, useCallback } from "react";

import Loading from "../../components/ui/loading/Loading";
import Table from "../../components/ui/table/Table";
import {
  ShiftsContainer,
  Title,
  CellContent,
  CellContainer,
} from "./shifts.styles";

import { getCookie } from "../../utils/cookies";

const renderShiftCell = (value, row) => {
  return (
    <CellContainer>
      <CellContent>
        {value ? `${value.startTime} ${value.endTime}` : "No Shift"}
      </CellContent>
    </CellContainer>
  );
};

const Shifts = () => {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const columns = [
    { header: "Employee", accessor: "employee" },
    { header: "Role", accessor: "role" },
    {
      header: "Mon",
      accessor: "mon",
      render: renderShiftCell,
    },
    {
      header: "Tue",
      accessor: "tue",
      render: renderShiftCell,
    },
    {
      header: "Wed",
      accessor: "wed",
      render: renderShiftCell,
    },
    {
      header: "Thu",
      accessor: "thu",
      render: renderShiftCell,
    },
    {
      header: "Fri",
      accessor: "fri",
      render: renderShiftCell,
    },
    {
      header: "Sat",
      accessor: "sat",
      render: renderShiftCell,
    },
    {
      header: "Sun",
      accessor: "sun",
      render: renderShiftCell,
    },
  ];

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const response = await fetch("/api/users/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const users = await response.json();
      setEmployees(formatData(users));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("EmployeeList", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const formatData = (data) => {
    return data
      .filter((employee) => employee.role !== "employer")
      .map((employee) => ({
        employee: `${employee.name} ${employee.surname}`,
        role: employee.role,
        mon: { startTime: "18:00", endTime: "22:00" },
        id: employee.id,
      }));
  };

  return (
    <ShiftsContainer>
      <Title>Shifts</Title>
      {loading ? <Loading /> : <Table columns={columns} data={employees} />}
    </ShiftsContainer>
  );
};

export default Shifts;

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/ui/table/Table";
import { DateTime } from "luxon";

import { getCookie } from "../../../utils/cookies";
import Loading from "../../../components/ui/loading/Loading";

const EmployeeList = () => {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Surname", accessor: "surname" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    { header: "Start Date", accessor: "startDate" },
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
        name: employee.name,
        surname: employee.surname,
        email: employee.email,
        role: employee.role,
        startDate: DateTime.fromISO(employee.startDate).toFormat("dd LLL yyyy"),
        id: employee.id,
      }));
  };

  const handleRowClick = (row) => {
    navigate(`/employees/details/${row.id}`);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Table
          columns={columns}
          data={employees}
          onRowClick={handleRowClick}
          cursor={"pointer"}
        />
      )}
    </div>
  );
};

export default EmployeeList;

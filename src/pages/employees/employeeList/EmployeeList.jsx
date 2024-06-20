import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/ui/table/Table";
import { DateTime } from "luxon";

import { getCookie } from "../../../utils/cookies";
import Loading from "../../../components/ui/loading/Loading";

const EmployeeList = () => {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const columns = ["Name", "Surname", "Email", "Role", "Start Date"];

  const apiCall = async () => {
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
  };

  useEffect(() => {
    apiCall();
  }, []);

  const formatData = (data) => {
    return data
      .filter((employee) => employee.role !== "employer")
      .map((employee) => ({
        Name: employee.name,
        Surname: employee.surname,
        Email: employee.email,
        Role: employee.role,
        "Start Date": DateTime.fromISO(employee.startDate).toFormat(
          "dd LLL yyyy"
        ),
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
        <Table columns={columns} data={employees} onRowClick={handleRowClick} />
      )}
    </div>
  );
};

export default EmployeeList;

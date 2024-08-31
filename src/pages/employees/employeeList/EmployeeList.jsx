import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/ui/table/Table";
import { DateTime } from "luxon";
import { LuTrash2 } from "react-icons/lu";

import { getCookie } from "../../../utils/cookies";
import Loading from "../../../components/ui/loading/Loading";
import DeleteUserModal from "../../../components/deleteUserModal/DeleteUserModal";
import { IconContainer } from "./employeeList.styles";

const EmployeeList = () => {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [userId, setUserId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Surname", accessor: "surname" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    { header: "Start Date", accessor: "startDate" },
    {
      header: "Delete User",
      accessor: "id",
      render: (value, row) => {
        return (
          <IconContainer>
            <LuTrash2 color="red" fontSize={30} />
          </IconContainer>
        );
      },
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
        name: employee.name,
        surname: employee.surname,
        email: employee.email,
        role: employee.role,
        startDate: DateTime.fromISO(employee.startDate).toFormat("dd LLL yyyy"),
        id: employee.id,
      }));
  };

  const onCellClick = (cellValue, row, colIndex, rowIndex) => {
    if (colIndex === 5) {
      setUserId(cellValue);
      return setModalOpen(true);
    }
    navigate(`/employees/details/${row.id}`);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      setModalOpen(false);
      setLoading(true);
      const token = getCookie("token");
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = await response.json();

      if (user.deleted) {
        alert(`user: ${userId}, Deleted succesfully`);
      } else {
        alert(`Error deleting user: ${userId}`);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("EmployeeDetails", error);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {modalOpen && (
            <DeleteUserModal
              id={userId}
              handleClose={handleClose}
              handleDelete={handleDelete}
            />
          )}
          <Table
            columns={columns}
            data={employees}
            onCellClick={onCellClick}
            cursor={"pointer"}
          />
        </>
      )}
    </div>
  );
};

export default EmployeeList;

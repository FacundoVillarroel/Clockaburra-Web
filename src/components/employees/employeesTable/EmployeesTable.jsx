import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../ui/table/Table";

import { LuTrash2 } from "react-icons/lu";
import { IconContainer } from "./emplolyeesTable.styles";
import DeleteUserModal from "../../deleteUserModal/DeleteUserModal";
import Loading from "../../ui/loading/Loading";

import { getCookie } from "../../../utils/cookies";
import EmptyState from "../../emptyState/EmptyState";

const EmployeesTable = ({ employees, setEmployees }) => {
  const [loading, setLoading] = useState(false);
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

  const onCellClick = (cellValue, row, colIndex, rowIndex) => {
    if (colIndex === 5) {
      setUserId(cellValue);
      return setModalOpen(true);
    }
    navigate(`/employees/details/${row.id}`);
  };

  const handleDelete = async () => {
    try {
      setModalOpen(false);
      setLoading(true);
      const token = getCookie("token");
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = await response.json();

      if (user.deleted) {
        alert(`user: ${userId}, Deleted succesfully`);
        setEmployees(employees.filter((employee) => employee.id !== userId));
      } else {
        alert(`Error deleting user: ${userId}`);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("EmployeeDetails", error);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
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
          {employees.length ? (
            <Table
              columns={columns}
              data={employees}
              onCellClick={onCellClick}
              cursor={"pointer"}
            />
          ) : (
            <EmptyState message="No employees match your criteria" />
          )}
        </>
      )}
    </>
  );
};

export default EmployeesTable;

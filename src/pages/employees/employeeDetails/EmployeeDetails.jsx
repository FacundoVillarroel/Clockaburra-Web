import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/ui/loading/Loading";
import { LuPenSquare, LuTrash2 } from "react-icons/lu";

import Card from "../../../components/ui/card/Card";

import { getCookie } from "../../../utils/cookies";
import {
  RootContainer,
  EmployeeHeader,
  EmployeeBody,
  EmployeeImageContainer,
  EditButton,
  DeleteButton,
  Info,
} from "./EmployeeDetails.styles";

import DeleteUserModal from "../../../components/deleteUserModal/DeleteUserModal";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState({ surname: "Hola" });
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    try {
      const token = getCookie("token");
      setLoading(true);
      const response = await fetch(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await response.json();
      console.log(user);
      setEmployee(user.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("EmployeeDetail", error);
      navigate("/employees/list");
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleDelete = async () => {
    try {
      setModalOpen(false);
      setLoading(true);
      const token = getCookie("token");
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = await response.json();

      if (user.deleted) {
        alert(`user: ${id}, Deleted succesfully`);
        navigate("/employees/list");
      } else {
        alert(`Error deleting user: ${id}`);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("EmployeeDetails", error);
    }
  };

  const onDelete = () => {
    setModalOpen(true);
  };

  const handleCLose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <RootContainer>
          <EmployeeHeader>
            <EmployeeImageContainer />
            <Info>
              {employee.name} {employee.surname}
            </Info>
            <EditButton>
              <LuPenSquare color="white" fontSize={30} />
            </EditButton>
            <DeleteButton onClick={onDelete}>
              <LuTrash2 color="white" fontSize={30} />
            </DeleteButton>
          </EmployeeHeader>
          <EmployeeBody>
            <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
              <strong>Email:</strong> {employee.email}
            </Card>
            <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
              <strong>Starting Date:</strong>{" "}
              {employee.startDate?.split("T")[0]}
            </Card>
            <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
              <strong>Address:</strong> {employee.address}
            </Card>
            <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
              <strong>Phone Number:</strong> {employee.phoneNumber}
            </Card>
            <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
              <strong>Role:</strong> {employee.role}
            </Card>
            <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
              <strong>Hourly Rate:</strong> {employee.hourlyRate}
            </Card>
            <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
              <strong>Complete Registration:</strong>
              {employee.isRegistered ? "Yes" : "No"}
            </Card>
          </EmployeeBody>
          {modalOpen && (
            <DeleteUserModal
              id={id}
              handleCLose={handleCLose}
              handleDelete={handleDelete}
            />
          )}
        </RootContainer>
      )}
    </div>
  );
};

export default EmployeeDetails;

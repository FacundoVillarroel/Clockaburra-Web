import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/ui/loading/Loading";
import { LuPenSquare, LuTrash2 } from "react-icons/lu";

import Card from "../../../components/ui/card/Card";
import logo from "../../../assets/logoClockaburra.png";

import { getCookie } from "../../../utils/cookies";
import {
  RootContainer,
  EmployeeHeader,
  EmployeeBody,
  EmployeeImageContainer,
  EditButton,
  DeleteButton,
  ResendButtonContainer,
  Info,
} from "./EmployeeDetails.styles";

import DeleteUserModal from "../../../components/deleteUserModal/DeleteUserModal";
import Button from "../../../components/ui/button/Button";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState({});
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

  const handleResendLink = async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const response = await fetch(`/api/users/resend-validation-link/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: employee.name,
          role: employee.role,
        }),
      });
      const result = await response.json();
      if (result.ok) {
        alert("Validation link sent to user email successfully");
      } else {
        alert(
          "There was a problem sending the validation link, please try again later."
        );
      }
      setLoading(false);
    } catch (error) {
      console.error("EmployeeDetails: ", error);
      alert(
        "There was a problem sending the validation link, please try again later."
      );
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <RootContainer>
          <EmployeeHeader>
            <EmployeeImageContainer image_url={employee.imageUrl || logo} />
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
          {!employee.isRegistered && (
            <ResendButtonContainer>
              <Button onClick={handleResendLink}>
                Resend registration link
              </Button>
            </ResendButtonContainer>
          )}
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

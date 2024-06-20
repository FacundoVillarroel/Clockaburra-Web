import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

const EmployeeDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState({ surname: "Hola" });

  const fetchUser = async () => {
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
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

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
            <DeleteButton>
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
        </RootContainer>
      )}
    </div>
  );
};

export default EmployeeDetails;

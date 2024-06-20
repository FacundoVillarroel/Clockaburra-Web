import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/ui/loading/Loading";

import { getCookie } from "../../../utils/cookies";
import { RootContainer, Info } from "./EmployeeDetails.styles";

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
          <Info>
            <strong>Surname:</strong> {employee.surname}
          </Info>
          <Info>
            <strong>Name:</strong> {employee.name}
          </Info>
          <Info>
            <strong>Email:</strong> {employee.email}
          </Info>
          <Info>
            <strong>Starting Date:</strong> {employee.startDate?.split("T")[0]}
          </Info>
          <Info>
            <strong>Address:</strong> {employee.address}
          </Info>
          <Info>
            <strong>Phone Number:</strong> {employee.phoneNumber}
          </Info>
          <Info>
            <strong>Role:</strong> {employee.role}
          </Info>
          <Info>
            <strong>Hourly Rate:</strong> {employee.hourlyRate}
          </Info>
          <Info>
            <strong>Complete Registration:</strong>{" "}
            {employee.isRegistered ? "Yes" : "No"}
          </Info>
        </RootContainer>
      )}
    </div>
  );
};

export default EmployeeDetails;

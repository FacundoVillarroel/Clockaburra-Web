import React, { useState } from "react";
import Form from "../../../components/form/Form";
import { getCookie } from "../../../utils/cookies";
import { DateTime } from "luxon";

import { EmployeeFormContainer, Title } from "./employeeForm.styles";
import Loading from "../../../components/ui/loading/Loading";
import { useSelector } from "react-redux";

const EmployeeForm = () => {
  const [loading, setLoading] = useState(false);
  const { roles, status } = useSelector((state) => state.organization);

  let options = [{ label: "", value: "" }];
  if (roles.length) {
    options = roles.map((role) => ({
      label: role.name,
      value: role.name,
    }));
  }

  const fields = [
    { label: "Email", type: "email", name: "email" },
    { label: "Name", type: "text", name: "name" },
    { label: "Surname", type: "text", name: "surname" },
    {
      label: "Role",
      type: "select",
      name: "role",
      options: options,
    },
    { label: "Start Date", type: "date", name: "startDate" },
    { label: "Hourly Rate", type: "number", name: "hourlyRate" },
  ];

  const handleSubmit = async (formData) => {
    const hasEmptyValue = Object.values(formData).some((value) => !value);
    if (hasEmptyValue) {
      return alert("There are empty values on the form");
    }
    const token = getCookie("token");
    let startDate = DateTime.fromISO(formData.startDate);
    startDate = startDate.startOf("day");
    formData.startDate = startDate.toString();

    try {
      setLoading(true);
      const response = await fetch("/api/users", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Employee created successfully");
      }
      if (result.message === "Document already exists") {
        alert("Email already in use");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <EmployeeFormContainer>
      <Title>Add a new Employee</Title>
      <div>
        {loading || status === "loading" ? (
          <Loading />
        ) : (
          <Form onSubmit={handleSubmit} fields={fields} />
        )}
      </div>
    </EmployeeFormContainer>
  );
};

export default EmployeeForm;

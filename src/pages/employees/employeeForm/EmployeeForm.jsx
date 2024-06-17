import React from "react";
import Form from "../../../components/form/Form";
import { getCookie } from "../../../utils/cookies";
import { DateTime } from "luxon";

import { EmployeeFormContainer, Title } from "./employeeForm.styles";

const EmployeeForm = () => {
  const fields = [
    { label: "Email", type: "email", name: "email" },
    { label: "Name", type: "text", name: "name" },
    { label: "Surname", type: "text", name: "surname" },
    {
      label: "Role",
      type: "select",
      name: "role",
      options: [
        { label: "Employee", value: "employee" },
        { label: "Employer", value: "employer" },
      ],
    },
    { label: "Start Date", type: "date", name: "startDate" },
    { label: "Hourly Rate", type: "number", name: "hourlyRate" },
  ];

  const handleSubmit = async (formData) => {
    const hasEmptyValue = Object.values(formData).some((value) => !value);
    if (hasEmptyValue) {
      return alert("There are empty values on the form");
    }
    console.log(formData);
    const token = getCookie("token");
    let startDate = DateTime.fromISO(formData.startDate);
    startDate = startDate.startOf("day");
    formData.startDate = startDate.toString();

    try {
      const response = await fetch("/api/users", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const respuesta = await response.json();
      console.log("Respuesta", respuesta);
    } catch (error) {}
  };

  return (
    <EmployeeFormContainer>
      <Title>Add a new Employee</Title>
      <Form onSubmit={handleSubmit} fields={fields} />
    </EmployeeFormContainer>
  );
};

export default EmployeeForm;

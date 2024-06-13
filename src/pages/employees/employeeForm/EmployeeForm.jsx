import React from "react";
import Form from "../../../components/form/Form";

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

  const handleSubmit = (formData) => {
    console.log("Form Data Submitted:", formData);
  };

  return (
    <EmployeeFormContainer>
      <Title>Add a new Employee</Title>
      <Form onSubmit={handleSubmit} fields={fields} />
    </EmployeeFormContainer>
  );
};

export default EmployeeForm;

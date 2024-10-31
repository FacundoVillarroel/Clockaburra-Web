import React, { useState } from "react";
import Form from "../../../components/form/Form";
import { getCookie } from "../../../utils/cookies";
import { DateTime } from "luxon";

import { EmployeeFormContainer, Title } from "./employeeFormStyles.js";
import Loading from "../../../components/ui/loading/Loading";
import { useSelector } from "react-redux";
import { newUserValidation } from "../../../utils/newUserValidation";

const EmployeeForm = () => {
  const [loading, setLoading] = useState(false);
  const { roles, departments, status } = useSelector(
    (state) => state.organization
  );

  let rolesOptions = [{ label: "", value: "" }];
  if (roles.length) {
    rolesOptions = roles.map((role) => ({
      label: role.name,
      value: role.name,
    }));
  }

  let departmentsOptions = [{ label: "", value: "" }];
  if (departments.length) {
    departmentsOptions = departments.map((department) => ({
      label: department.name,
      value: department.name,
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
      options: rolesOptions,
    },
    {
      label: "Department",
      type: "select",
      name: "department",
      options: departmentsOptions,
    },
    {
      label: "Permissions",
      type: "select",
      name: "permissions",
      options: [
        { label: "User", value: "user" },
        { label: "Admin", value: "admin" },
      ],
    },
    { label: "Start Date", type: "date", name: "startDate" },
    { label: "Hourly Rate", type: "number", name: "hourlyRate" },
  ];

  const handleSubmit = async (formData) => {
    const errors = newUserValidation(
      formData,
      rolesOptions,
      departmentsOptions
    );
    if (errors.length > 0) {
      return alert(errors.join("\n"));
    }
    const token = getCookie("token");
    let startDate = DateTime.fromISO(formData.startDate);
    startDate = startDate.startOf("day");
    formData.startDate = startDate.toString();

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../form/Form";
import Loading from "../ui/loading/Loading";

import { RootContainer, Title } from "./completeRegistrationFormStyles.js";

const fields = [
  { label: "Password", type: "password", name: "password" },
  { label: "Name", type: "text", name: "name" },
  { label: "Surname", type: "text", name: "surname" },
  { label: "Phone Number", type: "tel", name: "phoneNumber" },
  { label: "Address", type: "text", name: "address" },
];

const CompleteRegistrationForm = ({ token, user }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    const hasEmptyValue = Object.values(formData).some((value) => !value);
    if (hasEmptyValue) {
      return alert("There are empty values on the form");
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...formData, email: user.userId }),
        }
      );

      const result = await response.json();

      alert(result.message);
      if (result.message === "Successful registration") {
        navigate("/app-for-employees-link");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <RootContainer>
      <Title>Complete your registration with your information</Title>
      {loading ? <Loading /> : <Form onSubmit={handleSubmit} fields={fields} />}
    </RootContainer>
  );
};

export default CompleteRegistrationForm;

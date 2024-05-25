import React, { useState } from "react";
import styled from "styled-components";

// Styled components
const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid ${(props) => (props.error ? "#FF6347" : "#ccc")};
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: ${(props) => (props.error ? "#FF6347" : "#007BFF")};
  }
`;

const ErrorMessage = styled.span`
  margin-top: 5px;
  font-size: 12px;
  color: #ff6347;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

// Reusable InputForm component
const InputForm = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
}) => {
  return (
    <FormControl>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        placeholder={placeholder}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormControl>
  );
};

// Example usage
const Form = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = "";
    if (!value) {
      error = `${name} is required`;
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid email address";
    } else if (name === "password" && value.length < 6) {
      error = "Password must be at least 6 characters";
    }
    setFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    Object.keys(formValues).forEach((name) => {
      if (!formValues[name]) {
        errors[name] = `${name} is required`;
      }
    });
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // Handle form submission
      console.log("Form submitted successfully:", formValues);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputForm
        label="Email"
        type="email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={formErrors.email}
        placeholder="Enter your email"
      />
      <InputForm
        label="Password"
        type="password"
        name="password"
        value={formValues.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={formErrors.password}
        placeholder="Enter your password"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;

import React, { useState } from "react";

import { FormControl, Label, Input, ErrorMessage, Button } from "./Form.styles";

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

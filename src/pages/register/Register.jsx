import React from "react";

import Button from "../../components/ui/button/Button";

import {
  RegisterContainer,
  Title,
  Form,
  Input,
  NewMemberLink,
} from "./registerStyles.js";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked");
  };

  return (
    <RegisterContainer>
      <Title>Register</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button type="submit">Register</Button>
      </Form>
      <NewMemberLink to="/login">Already a member?</NewMemberLink>
    </RegisterContainer>
  );
};

export default Register;

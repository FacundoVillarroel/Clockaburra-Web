import React from "react";

import Button from "../../components/ui/button/Button";

import {
  RegisterContainer,
  Title,
  Form,
  Input,
  NewMemberLink,
} from "./Register.styles";

const Register = ({ setIsLoggedIn }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked");
    setIsLoggedIn(true);
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

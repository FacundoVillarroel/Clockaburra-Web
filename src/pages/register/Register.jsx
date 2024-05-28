import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Button from "../../components/ui/button/Button";

const RegisterContainer = styled.div`
  max-width: 400px;
  margin: 10rem auto 4rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Title = styled.h1`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const NewMemberLink = styled(NavLink)`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

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

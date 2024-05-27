import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Button from "../../components/ui/button/Button";

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 4rem auto;
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

const ForgotPasswordLink = styled(NavLink)`
  text-align: right;
  margin-bottom: 1rem;
  display: block;
  text-decoration: none;
  color: black;
  margin-top: 1rem;
`;

const NewMemberLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  margin-top: 1rem;
  cursor: pointer;
`;

const Login = ({ setIsLoggedIn }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked");
    setIsLoggedIn(true);
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button type="submit">Login</Button>
      </Form>
      <ForgotPasswordLink href="#">Forgot password?</ForgotPasswordLink>
      <NewMemberLink to="/register">New member?</NewMemberLink>
    </LoginContainer>
  );
};

export default Login;

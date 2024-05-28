import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import axios from "axios";

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
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_IP}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        }
      );
      const user = await response.json();
      console.log("USER", user);
      const token =
        response.headers.get("Authorization")?.split(" ")[1] || null;
      if (!token) {
        setLoading(false);
        console.log("no token", token);
      }
      console.log("TOKEN:", token);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={values.email}
          name="email"
          onChange={handleInputChange}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleInputChange}
          name="password"
        />
        <Button type="submit">Login</Button>
      </Form>
      <ForgotPasswordLink href="#">Forgot password?</ForgotPasswordLink>
      <NewMemberLink to="/register">New member?</NewMemberLink>
    </LoginContainer>
  );
};

export default Login;

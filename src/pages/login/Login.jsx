import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/reducers/authSlice";

import Button from "../../components/ui/button/Button";
import Loading from "../../components/ui/loading/Loading";

const LoginContainer = styled.div`
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

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(login({ email: values.email, password: values.password }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
      {status === "loading" ? (
        <Loading />
      ) : (
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
      )}
      {status === "failed" && <p>{error}</p>}
      <ForgotPasswordLink href="#">Forgot password?</ForgotPasswordLink>
      <NewMemberLink to="/register">New member?</NewMemberLink>
    </LoginContainer>
  );
};

export default Login;

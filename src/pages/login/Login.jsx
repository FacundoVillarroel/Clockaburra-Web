import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/reducers/authSlice";

import Button from "../../components/ui/button/Button";
import Loading from "../../components/ui/loading/Loading";

import {
  LoginContainer,
  Title,
  Form,
  Input,
  ForgotPasswordLink,
  NewMemberLink,
} from "./Login.styles";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

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
      <ForgotPasswordLink href="#">Forgot password?</ForgotPasswordLink>
      <NewMemberLink to="/register">New member?</NewMemberLink>
    </LoginContainer>
  );
};

export default Login;

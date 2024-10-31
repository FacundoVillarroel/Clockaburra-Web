import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin, login } from "../../store/reducers/authSlice";

import Button from "../../components/ui/button/Button";
import Loading from "../../components/ui/loading/Loading";

import {
  LoginContainer,
  Title,
  Form,
  Input,
  GoogleButtonContainer,
  LinksContainer,
  ForgotPasswordLink,
  NewMemberLink,
  ErrorText,
} from "./login.styles.js";
import GoogleLoginButton from "../../components/googleLoginButton/GoogleLoginButton";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [values, setValues] = useState(initialValues);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
      setIsSubmitted(true);
      setValues((oldValues) => {
        return { email: oldValues.email, password: "" };
      });
    } catch (error) {
      console.error("Login.jsx:", error);
    }
  };

  const getText = () => {
    if (
      error === "Incorrect email or password" &&
      isSubmitted &&
      !values.password &&
      status === "failed"
    ) {
      return "Incorrect email or password";
    } else {
      return "";
    }
  };

  const handleSuccess = async (credentialResponse) => {
    const accessToken = credentialResponse.credential;
    try {
      dispatch(googleLogin(accessToken));
      setIsSubmitted(true);
    } catch (error) {
      console.error("Login.jsx:", error);
    }
  };

  const handleError = (error) => {
    console.log("Error", error);
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
      <GoogleButtonContainer>
        <GoogleLoginButton
          handleSuccess={handleSuccess}
          handleError={handleError}
        />
      </GoogleButtonContainer>
      <ErrorText>{getText()}</ErrorText>
      <LinksContainer>
        <ForgotPasswordLink to="/reset-password">
          Forgot password?
        </ForgotPasswordLink>
        <NewMemberLink to="/register">New member?</NewMemberLink>
      </LinksContainer>
    </LoginContainer>
  );
};

export default Login;

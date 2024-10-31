import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import Loading from "../../components/ui/loading/Loading";

import { useQuery } from "../../hooks/useQuery";

import {
  Form,
  Input,
  ResetContainer,
  Title,
  SubTitle,
  LinksContainer,
  LoginLink,
  NewMemberLink,
} from "./resetPassword.styles";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const query = useQuery();

  const token = query.get("token");
  const name = query.get("name");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const queryParams = encodeURIComponent(email);
      if (token) {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/users/reset-password`,
          {
            method: "put",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, password }),
          }
        );
        const data = await response.json();
        alert(data.message);
        if (data.updated) {
          navigate("/login");
        }
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/auth/send-link-reset-password?email=${queryParams}`
        );
        const data = await response.json();
        alert(data.message);
        if (data.ok) {
          alert("Please check you email for further instructions.");
          navigate("/");
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("ResetPassword.jsx:", error);
    }
  };

  return (
    <ResetContainer>
      <Title> Reset Password</Title>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Form onSubmit={handleSubmit}>
            {token ? (
              <>
                <SubTitle>Hello {name}! Enter you new password.</SubTitle>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  name="password"
                  onChange={handleChangePassword}
                  required
                />
                <Button type="submit">Submit New Password</Button>
              </>
            ) : (
              <>
                <SubTitle>
                  Enter you email and we will send you an link to reset it.
                </SubTitle>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={handleChangeEmail}
                  required
                />
                <Button type="submit">Send link to email</Button>
              </>
            )}
          </Form>
          <LinksContainer>
            <LoginLink to="/login">Already an user?</LoginLink>
            <NewMemberLink to="/register">New member?</NewMemberLink>
          </LinksContainer>
        </>
      )}
    </ResetContainer>
  );
};

export default ResetPassword;

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import Loading from "../../components/ui/loading/Loading";

import {
  Form,
  Input,
  ResetContainer,
  Title,
  LinksContainer,
  LoginLink,
  NewMemberLink,
} from "./resetPassword.styles";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const queryParams = encodeURIComponent(email);
      const response = await fetch(
        `/api/auth/send-link-reset-password?email=${queryParams}`
      );
      const data = await response.json();
      alert(data.message);
      if (data.ok) {
        alert("Please check you email for further instructions.");
        navigate("/");
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
            <Input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
              required
            />
            <Button type="submit">Send link to email</Button>
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

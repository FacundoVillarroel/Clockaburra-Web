import React from "react";
import { useState } from "react";
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

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Email sent to: ", email);
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

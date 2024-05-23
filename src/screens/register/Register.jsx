import React from "react";
import styled from "styled-components";

const RegisterContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
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

const Button = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 3px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;

const NewMemberLink = styled.a`
  margin-top: 1rem;
  text-align: center;
  display: block;
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
      <NewMemberLink href="#">Already a member?</NewMemberLink>
    </RegisterContainer>
  );
};

export default Register;

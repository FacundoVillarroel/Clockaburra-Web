import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const LoginContainer = styled.div`
  max-width: 400px;
  margin: 10rem auto 4rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Title = styled.h1`
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

export const ForgotPasswordLink = styled(NavLink)`
  text-align: right;
  margin-bottom: 1rem;
  display: block;
  text-decoration: none;
  color: black;
  margin-top: 1rem;
`;

export const NewMemberLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  margin-top: 1rem;
  cursor: pointer;
`;

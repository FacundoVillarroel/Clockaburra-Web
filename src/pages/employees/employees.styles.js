import styled from "styled-components";
import { Link } from "react-router-dom";
import Colors from "../../constants/Colors";

export const EmployeesContainer = styled.div`
  max-width: 70rem;
  margin: 7rem auto 4rem auto;
  padding: 2rem;
`;

export const Title = styled.h1`
  text-align: center;
`;

export const Content = styled.div`
  margin-top: 2rem;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${Colors.secondary};
  padding: 2rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

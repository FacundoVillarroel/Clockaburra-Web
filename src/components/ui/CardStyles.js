// src/components/CardStyles.js
import styled from "styled-components";

export const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 8px;
  color: #333;
`;

export const Body = styled.p`
  font-size: 1rem;
  margin-bottom: 16px;
  color: #666;
`;

export const Button = styled.button`
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }
`;

import styled from "styled-components";

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid ${(props) => (props.error ? "#FF6347" : "#ccc")};
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: ${(props) => (props.error ? "#FF6347" : "#007BFF")};
  }
`;

export const ErrorMessage = styled.span`
  margin-top: 5px;
  font-size: 12px;
  color: #ff6347;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

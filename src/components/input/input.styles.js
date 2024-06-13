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

export const StyledInput = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid ${(props) => (props.error ? "#FF6347" : "#ccc")};
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: ${(props) => (props.error ? "#FF6347" : "#007BFF")};
  }
`;

export const StyledSelect = styled.select`
  padding: 10px;
  font-size: 14px;
  border: 1px solid ${(props) => (props.error ? "#FF6347" : "#ccc")};
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: ${(props) => (props.error ? "#FF6347" : "#007BFF")};
  }
`;

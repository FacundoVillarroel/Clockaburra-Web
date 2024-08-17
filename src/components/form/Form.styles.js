import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const StyledInput = styled.div`
  display: flex;
  width: 100%;
  font-size: 14px;
  outline: none;
  justify-content: center;
  border: 1px solid ${(props) => (props.error ? "#FF6347" : "#ccc")};
  &:focus {
    border-color: ${(props) => (props.error ? "#FF6347" : "#007BFF")};
  }
`;

export const StyledDatePicker = styled(DatePicker)`
  font-size: 14px;
  border: 0px;
`;

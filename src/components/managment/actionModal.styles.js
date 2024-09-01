import styled from "styled-components";
import Colors from "../../constants/Colors";

export const Title = styled.h2`
  color: ${Colors.primary};
  margin-bottom: 1rem;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const SubTitle = styled.div`
  display: block;
  margin-bottom: 0.5rem;
`;

export const Label = styled.label`
  display: block;
  margin: 0.5rem;
`;

export const Input = styled.input`
  width: calc(100% - 2rem);
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const ConfirmButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  margin: 2rem 0rem;
  background-color: ${(props) => props.bg_color || "#007bff"};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

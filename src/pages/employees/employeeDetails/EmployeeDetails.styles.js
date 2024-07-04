import styled from "styled-components";
import Colors from "../../../constants/Colors";

export const RootContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const EmployeeHeader = styled.div`
  position: relative;
  width: 100%;
  padding-top: 3rem;
  padding-bottom: 2rem;
  background-color: ${Colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EmployeeImageContainer = styled.div`
  margin-bottom: 1rem;
  height: 7rem;
  width: 7rem;
  border-radius: 3.5rem;
  border: 1px solid ${Colors.accent};
  background-image: url(${(props) => props.image_url});
  background-size: cover;
  background-position: center;
`;

export const EditButton = styled.div`
  min-width: 1rem;
  min-height: 1rem;
  position: absolute;
  right: 4rem;
  top: 4rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;
export const DeleteButton = styled.div`
  min-width: 1rem;
  min-height: 1rem;
  position: absolute;
  right: 4rem;
  bottom: 4rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;
export const EmployeeBody = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 1.5rem; /* Añadir espacio entre elementos si es necesario */

  > * {
    flex-basis: calc(33.33% - 1.5rem);
    max-width: calc(33.33% - 1.5rem);
    min-width: calc(33.33% - 1.5rem);
    box-sizing: border-box;
  }
`;

export const EmployeeForm = styled.form`
  padding-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 1.5rem; /* Añadir espacio entre elementos si es necesario */

  > * {
    flex-basis: calc(33.33% - 1.5rem);
    max-width: calc(33.33% - 1.5rem);
    min-width: calc(33.33% - 1.5rem);
    box-sizing: border-box;
  }
`;

export const Label = styled.label`
  font-weight: bold;
  margin: 0;
`;

export const Input = styled.input`
  padding: 0.2rem 0.5rem;
  font-size: 0.9rem;
  border-radius: 0.5rem;
  border: 2px ${Colors.primary} solid;
  outline: none;
  width: fit-content;

  &:focus {
    border: 2px ${Colors.accent} solid;
    z-index: 1000;
  }
`;

export const ResendButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

export const Info = styled.div`
  margin-bottom: 10px;
  color: white;
`;

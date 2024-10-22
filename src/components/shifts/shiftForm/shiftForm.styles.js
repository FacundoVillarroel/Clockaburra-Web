import styled from "styled-components";

export const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const FormDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

export const BreaksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const BreakInputContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const DeleteBreakButton = styled.button`
  padding: 6px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

export const AddBreakButton = styled.button`
  padding: 8px 12px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 15px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const ButtonContainer = styled.div`
  margin-left: 1.5rem;
  width: 75%;
  display: inline-block;
  justify-content: end;
`;

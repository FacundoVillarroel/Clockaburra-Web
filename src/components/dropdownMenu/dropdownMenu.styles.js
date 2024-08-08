import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  cursor: pointer;
`;

export const DropdownContent = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  position: absolute;
  top: 30px;
  background-color: #f9f9f9;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const DropdownLabel = styled.div`
  padding: 8px 16px;
  font-weight: bold;
`;

export const DropdownItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

export const DropdownSeparator = styled.div`
  height: 1px;
  background-color: #ccc;
  margin: 4px 0;
`;

export const DropdownCheckboxItem = styled(DropdownItem)`
  display: flex;
  align-items: center;
  input {
    margin-right: 8px;
  }
`;

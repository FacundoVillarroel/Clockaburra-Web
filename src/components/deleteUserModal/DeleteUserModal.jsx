import React, { useState } from "react";

import Modal from "../ui/modal/Moldal";

import {
  Title,
  CloseButton,
  Label,
  Input,
  ConfirmButton,
} from "./deleteUserModal.styles";

const DeleteUserModal = ({ id, handleClose, handleDelete }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Modal>
      <CloseButton onClick={handleClose}>&times;</CloseButton>
      <Title>Are you sure you want to delete user {id}?</Title>
      <Label htmlFor="userIdInput">To confirm, please enter the user ID:</Label>
      <Input
        id="userIdInput"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <ConfirmButton onClick={handleDelete} disabled={inputValue !== id}>
        Confirm
      </ConfirmButton>
    </Modal>
  );
};

export default DeleteUserModal;

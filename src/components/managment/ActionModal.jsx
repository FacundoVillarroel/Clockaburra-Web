import React, { useState } from "react";
import Modal from "../ui/modal/Modal";

import {
  Title,
  SubTitle,
  CloseButton,
  Label,
  Input,
  ConfirmButton,
} from "./actionModalStyles.js";

const ActionModal = ({
  actionType,
  organizationType,
  handleClose,
  organization,
  handleAction,
}) => {
  const [values, setValues] = useState(organization || {});

  const handleInputChange = (e) => {
    setValues((prevVal) => {
      return { ...prevVal, [e.target.name]: e.target.value };
    });
  };

  const getContent = () => {
    if (actionType === "Delete") {
      return (
        <>
          <SubTitle>
            Are you sure you wantt o delete this {organizationType} :{" "}
            {organization.name} ?
          </SubTitle>
          <ConfirmButton onClick={handleAction}>Confirm</ConfirmButton>
        </>
      );
    } else if (actionType === "Edit" || actionType === "Add new") {
      return (
        <>
          <Label htmlFor="userIdInput">Name: </Label>
          <Input
            name="name"
            type="text"
            value={values.name || ""}
            onChange={handleInputChange}
          />
          <Label htmlFor="userIdInput">Description: </Label>
          <Input
            name="description"
            type="text"
            value={values.description || ""}
            onChange={handleInputChange}
          />
          <ConfirmButton
            onClick={() => {
              handleAction(values);
            }}
          >
            {actionType === "Edit" ? "Update" : "Save"}
          </ConfirmButton>
        </>
      );
    }
  };

  return (
    <Modal>
      <CloseButton onClick={handleClose}>&times;</CloseButton>
      <Title>
        {actionType} {organizationType}
      </Title>
      {getContent()}
    </Modal>
  );
};

export default ActionModal;

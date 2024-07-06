import React from "react";

import Modal from "../ui/modal/Moldal";
import Button from "../ui/button/Button";

import { Title, ButtonsContainer } from "./UpdateEmployeeModal.styles";

const UpdateEmployeeModal = ({ setModalOpen, handleSaveEmployee }) => {
  return (
    <Modal>
      <Title>Are you sure you want to save the changes?</Title>
      <ButtonsContainer>
        <Button onClick={handleSaveEmployee}>Save Changes</Button>
        <Button
          onClick={() => {
            setModalOpen(false);
          }}
          bg_color={"#ee4242"}
          hover_bg_color={"#ff0909"}
        >
          Cancel
        </Button>
      </ButtonsContainer>
    </Modal>
  );
};

export default UpdateEmployeeModal;

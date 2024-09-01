import React, { useState } from "react";

import Modal from "../ui/modal/Modal";
import Button from "../ui/button/Button";

import { Title, ButtonsContainer } from "./UpdateEmployeeModal.styles";
import Loading from "../ui/loading/Loading";

const UpdateEmployeeModal = ({ setModalOpen, handleSaveEmployee }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Modal>
      <Title>Are you sure you want to save the changes?</Title>
      {loading ? (
        <Loading />
      ) : (
        <ButtonsContainer>
          <Button onClick={() => handleSaveEmployee(setLoading)}>
            Save Changes
          </Button>
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
      )}
    </Modal>
  );
};

export default UpdateEmployeeModal;

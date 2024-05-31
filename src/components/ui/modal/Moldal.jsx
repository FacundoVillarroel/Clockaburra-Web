import React from "react";

import { ModalContent, ModalOverlay } from "./Modal.styles";

const Modal = ({ children, ...props }) => {
  return (
    <ModalOverlay {...props}>
      <ModalContent>{children}</ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

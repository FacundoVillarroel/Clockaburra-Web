import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

export const ModalContent = styled.div`
  background-color: ${(props) => props.bgColor || "#fff"};
  padding: ${(props) => props.padding || "1.6rem"};
  border-radius: ${(props) => props.borderRadius || "1.5rem"};
  width: ${(props) => props.width || "50rem"};
  max-width: 100%;
  position: relative;
`;

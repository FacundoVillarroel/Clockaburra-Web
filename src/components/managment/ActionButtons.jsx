import React from "react";

import Button from "../ui/button/Button";
import { IconContainer } from "./actionButtons.styles.js";

const ActionButtons = ({ organization, setOrganization, setModalOpen }) => {
  const handleEdit = () => {
    setModalOpen("Edit");
    setOrganization(organization);
  };

  const handleDelete = () => {
    setModalOpen("Delete");
    setOrganization(organization);
  };

  return (
    <IconContainer>
      <Button onClick={handleEdit} font_size="1rem" margin={"0rem .5rem"}>
        Edit
      </Button>
      <Button
        onClick={handleDelete}
        font_size="1rem"
        margin={"0rem .5rem"}
        bg_color={"#e23636"}
        hover_bg_color={"#ff2121"}
      >
        Delete
      </Button>
    </IconContainer>
  );
};

export default ActionButtons;

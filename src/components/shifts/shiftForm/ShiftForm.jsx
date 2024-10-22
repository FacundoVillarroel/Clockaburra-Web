import React from "react";
import { useNavigate } from "react-router-dom";

import Form from "../../form/Form";
import Input from "../../input/Input";
import Button from "../../ui/button/Button";

import {
  BreaksContainer,
  FormDescription,
  AddBreakButton,
  BreakInputContainer,
  ButtonContainer,
  DeleteBreakButton,
} from "./shiftForm.styles";

const ShiftForm = ({
  handleSubmit,
  fields,
  onAddBreak,
  breaks,
  handleBreakChange,
  deleteBreak,
}) => {
  const navigate = useNavigate();

  const onHandleBack = () => {
    navigate("/shifts");
  };

  return (
    <Form onSubmit={handleSubmit} fields={fields}>
      <BreaksContainer>
        <FormDescription>Breaks</FormDescription>
        <AddBreakButton type="button" onClick={onAddBreak}>
          Add Break
        </AddBreakButton>
        {breaks.map((breakItem, index) => (
          <BreakInputContainer key={index}>
            <Input
              label="Break Start"
              type="time"
              name="breakStart"
              step="900"
              value={breakItem.breakStart}
              onChange={(e) => handleBreakChange(index, e)}
            />
            <Input
              label="Break End"
              type="time"
              name="breakEnd"
              step="900"
              value={breakItem.breakEnd}
              min={breakItem.breakStart}
              onChange={(e) => handleBreakChange(index, e)}
            />
            <DeleteBreakButton type="button" onClick={() => deleteBreak(index)}>
              Delete
            </DeleteBreakButton>
          </BreakInputContainer>
        ))}
      </BreaksContainer>
      <ButtonContainer>
        <Button
          bg_color={"#ef0202"}
          hover_bg_color={"#d10707"}
          font_size={"1rem"}
          onClick={onHandleBack}
        >
          Go back to shifts
        </Button>
      </ButtonContainer>
    </Form>
  );
};

export default ShiftForm;

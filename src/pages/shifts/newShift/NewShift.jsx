import React, { useState } from "react";
import Form from "../../../components/form/Form";
import Input from "../../../components/input/Input";

import {
  FormContainer,
  FormTitle,
  FormDescription,
  BreaksContainer,
  BreakInputContainer,
  DeleteBreakButton,
  AddBreakButton,
} from "./newShift.styles";

const NewShift = () => {
  const [breaks, setBreaks] = useState([]);

  const startDate = new Date();

  const fields = [
    {
      label: "Start Date",
      type: "datetime-local",
      name: "startDate",
      value: startDate,
    },
    {
      label: "End Date",
      type: "datetime-local",
      name: "endDate",
      value: startDate,
    },
    {
      label: "User",
      type: "select",
      name: "userId",
      options: [
        { label: "Select user", value: "" },
        // Add user options dynamically from DB here
      ],
      value: "values.userId",
    },
  ];

  const handleBreakChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBreaks = [...breaks];
    updatedBreaks[index][name] = value;
    setBreaks(updatedBreaks);
  };

  const addBreak = () => {
    setBreaks([...breaks, { breakStart: "", breakEnd: "" }]);
  };

  const deleteBreak = (index) => {
    setBreaks(breaks.filter((_, i) => i !== index));
  };

  const handleSubmit = (data) => {
    console.log("Form submitted:", { ...data, breaks });
  };

  return (
    <FormContainer>
      <FormTitle>New shift</FormTitle>
      <FormDescription>Add new shift for an employee</FormDescription>
      <Form onSubmit={handleSubmit} fields={fields}>
        <BreaksContainer>
          <FormDescription>Breaks</FormDescription>
          <AddBreakButton type="button" onClick={addBreak}>
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
              <DeleteBreakButton
                type="button"
                onClick={() => deleteBreak(index)}
              >
                Delete
              </DeleteBreakButton>
            </BreakInputContainer>
          ))}
        </BreaksContainer>
      </Form>
    </FormContainer>
  );
};

export default NewShift;

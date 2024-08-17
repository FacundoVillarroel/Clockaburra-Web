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

function MyForm() {
  const [breaks, setBreaks] = useState([{ breakStart: "", breakEnd: "" }]);
  const [formState, setFormState] = useState({
    startDate: "",
    endDate: "",
    userId: "",
  });

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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fields = [
    {
      label: "Start Date",
      type: "datetime-local",
      name: "startDate",
      value: formState.startDate,
    },
    {
      label: "End Date",
      type: "datetime-local",
      name: "endDate",
      value: formState.endDate,
      min: formState.startDate, // Restricts endDate to be after startDate
    },
    {
      label: "User",
      type: "select",
      name: "userId",
      options: [
        { label: "Select user", value: "" },
        // Add user options dynamically from your DB here
      ],
      value: formState.userId,
    },
  ];

  return (
    <FormContainer>
      <FormTitle>New shift</FormTitle>
      <FormDescription>Add new shift for an employee</FormDescription>
      <Form
        onSubmit={handleSubmit}
        fields={fields}
        onChange={handleFormChange}
      />

      <BreaksContainer>
        <FormDescription>Breaks</FormDescription>
        {breaks.map((breakItem, index) => (
          <BreakInputContainer key={index}>
            <Input
              label="Break Start"
              type="time"
              name="breakStart"
              value={breakItem.breakStart}
              min={formState.startDate.split("T")[1]}
              onChange={(e) => handleBreakChange(index, e)}
            />
            <Input
              label="Break End"
              type="time"
              name="breakEnd"
              value={breakItem.breakEnd}
              min={breakItem.breakStart}
              max={formState.endDate.split("T")[1]}
              onChange={(e) => handleBreakChange(index, e)}
            />
            <DeleteBreakButton type="button" onClick={() => deleteBreak(index)}>
              Delete
            </DeleteBreakButton>
          </BreakInputContainer>
        ))}
        <AddBreakButton type="button" onClick={addBreak}>
          Add Break
        </AddBreakButton>
      </BreaksContainer>
    </FormContainer>
  );
}

export default MyForm;

import React, { useState } from "react";
import {
  FormContainer,
  FormTitle,
  FormDescription,
  Label,
  Input,
  Select,
  BreaksContainer,
  BreakInputContainer,
  DeleteBreakButton,
  AddBreakButton,
  SubmitButton,
} from "./newShift.styles";

function MyForm() {
  const [formState, setFormState] = useState({
    startDate: "",
    endDate: "",
    userId: "",
    breaks: [{ breakStart: "", breakEnd: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBreakChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBreaks = [...formState.breaks];
    updatedBreaks[index][name] = value;
    setFormState((prevState) => ({
      ...prevState,
      breaks: updatedBreaks,
    }));
  };

  const addBreak = () => {
    setFormState((prevState) => ({
      ...prevState,
      breaks: [...prevState.breaks, { breakStart: "", breakEnd: "" }],
    }));
  };

  const deleteBreak = (index) => {
    const updatedBreaks = formState.breaks.filter((_, i) => i !== index);
    setFormState((prevState) => ({
      ...prevState,
      breaks: updatedBreaks,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
  };

  return (
    <FormContainer>
      <FormTitle>Time Report</FormTitle>
      <FormDescription>
        Fill out the form to submit your time report.
      </FormDescription>

      <form onSubmit={handleSubmit}>
        <div>
          <Label>Start Date</Label>
          <Input
            type="datetime-local"
            name="startDate"
            value={formState.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>End Date</Label>
          <Input
            type="datetime-local"
            name="endDate"
            value={formState.endDate}
            min={formState.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>User</Label>
          <Select
            name="userId"
            value={formState.userId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select user
            </option>
            {/* Add user options from db here */}
          </Select>
        </div>

        <BreaksContainer>
          <Label>Breaks</Label>
          {formState.breaks.map((breakItem, index) => (
            <BreakInputContainer key={index}>
              <Input
                type="time"
                name="breakStart"
                value={breakItem.breakStart}
                min={formState.startDate.split("T")[1]}
                onChange={(e) => handleBreakChange(index, e)}
                required
              />
              <Input
                type="time"
                name="breakEnd"
                value={breakItem.breakEnd}
                min={breakItem.breakStart}
                max={formState.endDate.split("T")[1]}
                onChange={(e) => handleBreakChange(index, e)}
                required
              />
              <DeleteBreakButton
                type="button"
                onClick={() => deleteBreak(index)}
              >
                Delete
              </DeleteBreakButton>
            </BreakInputContainer>
          ))}
          <AddBreakButton type="button" onClick={addBreak}>
            Add Break
          </AddBreakButton>
        </BreaksContainer>

        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </FormContainer>
  );
}

export default MyForm;

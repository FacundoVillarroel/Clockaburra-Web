import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../../utils/cookies";

import Form from "../../form/Form";
import Input from "../../input/Input";
import Button from "../../ui/button/Button";
import { formatJsDateToLuxonISO } from "../../../utils/dateHelpers";
import {
  transformBreaksToISO,
  revertBreaksFromISO,
} from "../../../utils/shiftUtils";

import {
  FormTitle,
  BreaksContainer,
  FormDescription,
  AddBreakButton,
  BreakInputContainer,
  ButtonContainer,
  DeleteBreakButton,
} from "./shiftForm.styles.js";
import { useEffect } from "react";

const ShiftForm = ({
  title,
  description,
  setLoading,
  fields,
  userId = null,
  shiftId = null,
  shiftData = {},
}) => {
  const navigate = useNavigate();
  const [breaks, setBreaks] = useState([]);

  const handleBreakChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBreaks = [...breaks];
    updatedBreaks[index][name] = value;
    setBreaks(updatedBreaks);
  };

  const onAddBreak = () => {
    setBreaks([...breaks, { breakStart: "00:00", breakEnd: "00:00" }]);
  };

  const deleteBreak = (index) => {
    setBreaks(breaks.filter((_, i) => i !== index));
  };

  const onHandleBack = () => {
    navigate("/shifts");
  };

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const startDateFormatted = formatJsDateToLuxonISO(data.startDate);
      const endDateFormatted = formatJsDateToLuxonISO(data.endDate);
      if (userId) {
        data.userId = userId;
      }
      if (!data.userId) {
        return alert("Must select an user");
      }
      const newData = {
        ...data,
        startDate: startDateFormatted,
        endDate: endDateFormatted,
      };
      const transformedBreaks = transformBreaksToISO(newData.startDate, breaks);
      const reqBody = {
        ...newData,
        breaks: transformedBreaks,
      };

      // Set headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      // Determine URL and HTTP method based on shiftId
      const url = shiftId
        ? `${process.env.REACT_APP_BACKEND_URL}/shift/${shiftId}`
        : `${process.env.REACT_APP_BACKEND_URL}/shift`;
      const method = shiftId ? "PUT" : "POST";

      // Perform the API request
      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(reqBody),
      });

      // Handle response
      if (!response.ok) {
        console.error(await response.json());
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setLoading(false);
      navigate("/shifts");
      alert(result.message);
    } catch (error) {
      setLoading(false);
      console.error("ShiftForm", error);
    }
  };

  useEffect(() => {
    if (shiftData.breaks?.length) {
      const shiftBreaks = revertBreaksFromISO(shiftData.breaks);
      setBreaks(shiftBreaks);
    }
  }, [shiftData.breaks]);

  return (
    <>
      <FormTitle>{title}</FormTitle>
      <FormDescription>{description}</FormDescription>
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
              <DeleteBreakButton
                type="button"
                onClick={() => deleteBreak(index)}
              >
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
    </>
  );
};

export default ShiftForm;

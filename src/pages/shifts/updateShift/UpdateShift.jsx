import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Form from "../../../components/form/Form";
import Input from "../../../components/input/Input";
import Loading from "../../../components/ui/loading/Loading";
import { getCookie } from "../../../utils/cookies";

import {
  FormContainer,
  FormTitle,
  FormDescription,
  BreaksContainer,
  BreakInputContainer,
  DeleteBreakButton,
  AddBreakButton,
} from "./updateShift.styles";
import { formatJsDateToLuxonIso } from "../../../utils/dateHelpers";
import { transformBreaksToISO } from "../../../utils/shiftUtils";

const UpdateShift = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const userId = queryParams.get("userId");
  const name = queryParams.get("name");
  const shiftId =
    queryParams.get("shiftId") === "null" ? null : queryParams.get("shiftId");
  const date =
    queryParams.get("date") === "null" ? null : queryParams.get("date");

  const [loading, setLoading] = useState(false);
  const [breaks, setBreaks] = useState([]);
  const [startDate, setStartDate] = useState(new Date(date));
  const [endDate, setEndDate] = useState(new Date(date));

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
      value: endDate,
    },
  ];

  const fetchShift = useCallback(async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const response = await fetch(`/api/shift/${shiftId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const shift = await response.json();
      setBreaks(shift.breaks);
      console.log("SHIFT: ", shift);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }, [shiftId]);

  const handleBreakChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBreaks = [...breaks];
    updatedBreaks[index][name] = value;
    setBreaks(updatedBreaks);
  };

  const addBreak = () => {
    setBreaks([...breaks, { breakStart: "00:00", breakEnd: "00:00" }]);
  };

  const deleteBreak = (index) => {
    setBreaks(breaks.filter((_, i) => i !== index));
  };

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      const startDateFormatted = formatJsDateToLuxonIso(data.startDate);
      const endDateFormatted = formatJsDateToLuxonIso(data.endDate);
      const newData = {
        ...data,
        startDate: startDateFormatted,
        endDate: endDateFormatted,
      };
      const transformedBreaks = transformBreaksToISO(newData, breaks);
      const reqBody = {
        ...newData,
        userId,
        breaks: transformedBreaks,
      };
      const token = getCookie("token");
      const response = await fetch(`/api/shift`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reqBody),
      });
      if (!response.ok) {
        console.error(await response.json());
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const shiftCreated = await response.json();
      setLoading(false);
      navigate("/shifts");
      return alert(shiftCreated.message);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (shiftId !== "null" && shiftId) {
      fetchShift();
    }
  }, [fetchShift, shiftId]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <FormContainer>
          <FormTitle>Update shift</FormTitle>
          <FormDescription>Update shift for {name}</FormDescription>
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
      )}
    </>
  );
};

export default UpdateShift;

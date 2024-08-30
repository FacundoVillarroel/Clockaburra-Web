import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../components/ui/loading/Loading";
import Modal from "../../../components/ui/modal/Moldal";
import Button from "../../../components/ui/button/Button";
import Form from "../../../components/form/Form";
import Input from "../../../components/input/Input";
import { LuTrash2 } from "react-icons/lu";
import { getCookie } from "../../../utils/cookies";
import {
  revertBreaksFromISO,
  transformBreaksToISO,
} from "../../../utils/timesheetUtils";

import {
  FormContainer,
  DeleteButtonContainer,
  FormTitle,
  FormDescription,
  BreaksContainer,
  BreakInputContainer,
  DeleteBreakButton,
  AddBreakButton,
  ButtonContainer,
  ModalButtonsContainer,
  ModalTitle,
} from "./updateTimesheet.styles";
import { formatJsDateToLuxonISO } from "../../../utils/dateHelpers";

const UpdateTimesheet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const userId = queryParams.get("userId");
  const name = queryParams.get("name");
  const timesheetId =
    queryParams.get("timesheetId") === "null"
      ? null
      : queryParams.get("timesheetId");
  const date =
    queryParams.get("date") === "null" ? null : queryParams.get("date");

  const [loading, setLoading] = useState(false);
  const [breaks, setBreaks] = useState([]);
  const [startDate, setStartDate] = useState(new Date(date));
  const [endDate, setEndDate] = useState(new Date(date));
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const fetchTimesheet = useCallback(async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const response = await fetch(`/api/timesheet/${timesheetId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const timesheet = await response.json();
      if (timesheet.breaks.length) {
        const timesheetBreaks = revertBreaksFromISO(timesheet.breaks);
        setBreaks(timesheetBreaks);
      }
      setStartDate(new Date(timesheet.startDate));
      setEndDate(new Date(timesheet.endDate));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }, [timesheetId]);

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

  const onReject = async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const response = await fetch(`/api/timesheet/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: timesheetId }),
      });
      if (!response.ok) {
        console.error(await response.json());
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLoading(false);
      navigate("/timesheets");
      return alert(data.message);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      const startDateFormatted = formatJsDateToLuxonISO(data.startDate);
      const endDateFormatted = formatJsDateToLuxonISO(data.endDate);
      const newData = {
        ...data,
        startDate: startDateFormatted,
        endDate: endDateFormatted,
      };
      const transformedBreaks = transformBreaksToISO(newData.startDate, breaks);
      const reqBody = {
        ...newData,
        userId,
        breaks: transformedBreaks,
      };
      const token = getCookie("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      if (timesheetId) {
        const response = await fetch(`/api/timesheet/${timesheetId}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(reqBody),
        });
        if (!response.ok) {
          console.error(await response.json());
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const timesheetUpdated = await response.json();
        setLoading(false);
        navigate("/timesheets");
        return alert(timesheetUpdated.message);
      } else {
        const response = await fetch(`/api/timesheet`, {
          method: "POST",
          headers,
          body: JSON.stringify(reqBody),
        });
        if (!response.ok) {
          console.error(await response.json());
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const timesheetCreated = await response.json();
        await fetch(`/api/timesheet/approve`, {
          headers,
          method: "POST",
          body: JSON.stringify({ id: timesheetCreated.id }),
        });
        navigate("/timesheets");
        setLoading(false);
        return alert(timesheetCreated.message);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (timesheetId !== "null" && timesheetId) {
      fetchTimesheet();
    }
  }, [fetchTimesheet, timesheetId]);

  const onHandleBack = () => {
    navigate("/timesheets");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <FormContainer>
          {isModalOpen ? (
            <Modal>
              <ModalTitle>Mark this timesheet as rejected?</ModalTitle>
              <ModalButtonsContainer>
                <Button
                  bg_color={"#ef0202"}
                  hover_bg_color={"#d10707"}
                  onClick={onReject}
                >
                  Reject
                </Button>
                <Button
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </Button>
              </ModalButtonsContainer>
            </Modal>
          ) : null}
          {/* render Trash icon conditionally */}
          {timesheetId ? (
            <DeleteButtonContainer onClick={() => setIsModalOpen(true)}>
              <LuTrash2 color="red" fontSize={30} />
            </DeleteButtonContainer>
          ) : null}
          <FormTitle>Update Timesheet</FormTitle>
          <FormDescription>
            Approve or update timesheet for {name}
          </FormDescription>
          <Form
            onSubmit={handleSubmit}
            fields={fields}
            submitButtonText="Update and Approve"
          >
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
                    Delete Break
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
                Go back to timesheets
              </Button>
            </ButtonContainer>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default UpdateTimesheet;

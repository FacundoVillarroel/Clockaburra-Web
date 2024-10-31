import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { transformBreaksToISO } from "../../../utils/timesheetUtils";
import { getCookie } from "../../../utils/cookies";

import Loading from "../../../components/ui/loading/Loading";
import Form from "../../../components/form/Form";
import Input from "../../../components/input/Input";
import Button from "../../../components/ui/button/Button";
import { formatJsDateToLuxonISO } from "../../../utils/dateHelpers";
import {
  FormContainer,
  FormTitle,
  FormDescription,
  BreaksContainer,
  BreakInputContainer,
  DeleteBreakButton,
  AddBreakButton,
  ButtonContainer,
} from "./newTimesheetStyles.js";

const NewTimesheet = () => {
  const [loading, setLoading] = useState(false);
  const [breaks, setBreaks] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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
      options: [{ label: "Select user", value: "" }, ...users],
    },
  ];

  const handleBreakChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBreaks = [...breaks];
    updatedBreaks[index][name] = value;
    setBreaks(updatedBreaks);
  };

  const deleteBreak = (index) => {
    setBreaks(breaks.filter((_, i) => i !== index));
  };

  const addBreak = () => {
    setBreaks([...breaks, { breakStart: "00:00", breakEnd: "00:00" }]);
  };

  const handleSubmit = async (data) => {
    try {
      if (!data.userId) {
        return alert("Must select an user");
      }
      setLoading(true);
      const startDateFormatted = formatJsDateToLuxonISO(data.startDate);
      const endDateFormatted = formatJsDateToLuxonISO(data.endDate);
      const newData = {
        ...data,
        startDate: startDateFormatted,
        endDate: endDateFormatted,
      };
      const transformedBreaks = transformBreaksToISO(newData.startDate, breaks);
      const token = getCookie("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/timesheet`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ ...newData, breaks: transformedBreaks }),
        }
      );

      if (!response.ok) {
        console.error(await response.json());
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const timesheetCreated = await response.json();
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/timesheet/approve`, {
        headers,
        method: "POST",
        body: JSON.stringify({ id: timesheetCreated.id }),
      });
      setLoading(false);
      navigate("/timesheets");
      return alert(timesheetCreated.message);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const usersList = await response.json();
      if (usersList.length) {
        const formatedUsersList = usersList.map((user) => ({
          label: `${user.name} ${user.surname}`,
          value: user.id,
        }));
        setUsers(formatedUsersList);
      } else {
        setUsers(usersList);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("EmployeeList", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onHandleBack = () => {
    navigate("/timesheets");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <FormContainer>
          <FormTitle>New Timesheet</FormTitle>
          <FormDescription>Add new Timesheet for an employee</FormDescription>
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
            <ButtonContainer>
              <Button
                bg_color={"#ef0202"}
                hover_bg_color={"#d10707"}
                font_size={"1rem"}
                onClick={onHandleBack}
              >
                Go back to Timesheets
              </Button>
            </ButtonContainer>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default NewTimesheet;

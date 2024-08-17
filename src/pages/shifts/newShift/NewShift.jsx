import React, { useState, useEffect } from "react";
import Form from "../../../components/form/Form";
import Input from "../../../components/input/Input";
import Loading from "../../../components/ui/loading/Loading";
import { getCookie } from "../../../utils/cookies";
import { useNavigate } from "react-router-dom";
import { transformBreaksToISO } from "../../../utils/shiftUtils";

import {
  FormContainer,
  FormTitle,
  FormDescription,
  BreaksContainer,
  BreakInputContainer,
  DeleteBreakButton,
  AddBreakButton,
} from "./newShift.styles";
import { formatJsDateToLuxonIso } from "../../../utils/dateHelpers";

const NewShift = () => {
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

  const addBreak = () => {
    setBreaks([...breaks, { breakStart: "00:00", breakEnd: "00:00" }]);
  };

  const deleteBreak = (index) => {
    setBreaks(breaks.filter((_, i) => i !== index));
  };

  const handleSubmit = async (data) => {
    try {
      if (!data.userId) {
        return alert("Must select an user");
      }
      setLoading(true);
      const startDateFormatted = formatJsDateToLuxonIso(data.startDate);
      const endDateFormatted = formatJsDateToLuxonIso(data.endDate);
      const newData = {
        ...data,
        startDate: startDateFormatted,
        endDate: endDateFormatted,
      };
      const transformedBreaks = transformBreaksToISO(newData.startDate, breaks);
      const token = getCookie("token");

      const response = await fetch(`/api/shift`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...newData, breaks: transformedBreaks }),
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
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const response = await fetch(`/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
      )}
    </>
  );
};

export default NewShift;

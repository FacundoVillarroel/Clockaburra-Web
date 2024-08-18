import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Form from "../../../components/form/Form";
import Input from "../../../components/input/Input";
import Loading from "../../../components/ui/loading/Loading";
import { getCookie } from "../../../utils/cookies";
import Button from "../../../components/ui/button/Button";
import { LuTrash2 } from "react-icons/lu";

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
} from "./updateShift.styles";
import { formatJsDateToLuxonIso } from "../../../utils/dateHelpers";
import {
  revertBreaksFromISO,
  transformBreaksToISO,
} from "../../../utils/shiftUtils";
import Modal from "../../../components/ui/modal/Moldal";

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
      if (shift.breaks.length) {
        const shiftBreaks = revertBreaksFromISO(shift.breaks);
        setBreaks(shiftBreaks);
      }
      setStartDate(new Date(shift.startDate));
      setEndDate(new Date(shift.endDate));
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
      if (shiftId) {
        const response = await fetch(`/api/shift/${shiftId}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(reqBody),
        });
        if (!response.ok) {
          console.error(await response.json());
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const shiftModified = await response.json();
        setLoading(false);
        navigate("/shifts");
        return alert(shiftModified.message);
      } else {
        const response = await fetch(`/api/shift`, {
          method: "POST",
          headers,
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
      }
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

  const onHandleBack = () => {
    navigate("/shifts");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const response = await fetch(`/api/shift/${shiftId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      });
      if (!response.ok) {
        console.error(await response.json());
        alert(
          "An error occurred when trying to delete the shift",
          "please try again later"
        );
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseMessage = await response.json();
      alert(responseMessage.message);
      navigate("/shifts");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <FormContainer>
          {isModalOpen ? (
            <Modal>
              <ModalTitle>Are you sure to delete this shift?</ModalTitle>
              <ModalButtonsContainer>
                <Button
                  bg_color={"#ef0202"}
                  hover_bg_color={"#d10707"}
                  onClick={onDelete}
                >
                  Delete
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
          {shiftId ? (
            <DeleteButtonContainer onClick={() => setIsModalOpen(true)}>
              <LuTrash2 color="red" fontSize={30} />
            </DeleteButtonContainer>
          ) : null}
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
        </FormContainer>
      )}
    </>
  );
};

export default UpdateShift;

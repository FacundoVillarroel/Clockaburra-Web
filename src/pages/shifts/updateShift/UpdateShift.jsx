import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Loading from "../../../components/ui/loading/Loading";
import { getCookie } from "../../../utils/cookies";
import Button from "../../../components/ui/button/Button";
import { LuTrash2 } from "react-icons/lu";

import {
  FormContainer,
  DeleteButtonContainer,
  ModalButtonsContainer,
  ModalTitle,
} from "./updateShiftStyles.js";

import Modal from "../../../components/ui/modal/Modal";
import ShiftForm from "../../../components/shifts/shiftForm/ShiftForm";

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
  const [shiftData, setShiftData] = useState({
    startDate: new Date(date),
    endDate: new Date(date),
  });
  const [breaks, setBreaks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fields = [
    {
      label: "Start Date",
      type: "datetime-local",
      name: "startDate",
      value: shiftData.startDate,
    },
    {
      label: "End Date",
      type: "datetime-local",
      name: "endDate",
      value: shiftData.endDate,
    },
  ];

  const fetchShift = useCallback(async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/shift/${shiftId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const shift = await response.json();
      setShiftData({
        startDate: new Date(shift.startDate),
        endDate: new Date(shift.endDate),
        breaks: shift.breaks,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }, [shiftId]);

  useEffect(() => {
    if (shiftId !== "null" && shiftId) {
      fetchShift();
    }
  }, [fetchShift, shiftId]);

  const onDelete = async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/shift/${shiftId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "DELETE",
        }
      );
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
          {/* render Trash icon conditionally */}
          {shiftId ? (
            <DeleteButtonContainer onClick={() => setIsModalOpen(true)}>
              <LuTrash2 color="red" fontSize={30} />
            </DeleteButtonContainer>
          ) : null}
          <ShiftForm
            title={"Update shift"}
            description={`Update shift for ${name}`}
            setLoading={setLoading}
            fields={fields}
            breaks={breaks}
            setBreaks={setBreaks}
            userId={userId}
            shiftId={shiftId}
            shiftData={shiftData}
          />
        </FormContainer>
      )}
    </>
  );
};

export default UpdateShift;

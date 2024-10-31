import React, { useState, useEffect } from "react";
import Loading from "../../../components/ui/loading/Loading";
import { getCookie } from "../../../utils/cookies";

import { FormContainer } from "./newShiftStyles.js";

import ShiftForm from "../../../components/shifts/shiftForm/ShiftForm";

const NewShift = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <FormContainer>
          <ShiftForm
            title={"New shift"}
            description={"Add new shift for an employee"}
            setLoading={setLoading}
            fields={fields}
          />
        </FormContainer>
      )}
    </>
  );
};

export default NewShift;

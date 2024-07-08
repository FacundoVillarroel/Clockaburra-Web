import React, { useEffect, useState, useCallback } from "react";

import Loading from "../../components/ui/loading/Loading";
import {
  ShiftsContainer,
  Title,
  ActionBarContainer,
  ActionBarButtonContainer,
  AddShiftButton,
} from "./shifts.styles";

import { getCookie } from "../../utils/cookies";
import ShiftWeeklyView from "../../components/shiftWeeklyView/ShiftWeeklyView";

const Shifts = () => {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const response = await fetch("/api/users/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const users = await response.json();
      setEmployees(formatData(users));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("EmployeeList", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const formatData = (data) => {
    return data
      .filter((employee) => employee.role !== "employer")
      .map((employee) => ({
        employee: `${employee.name} ${employee.surname}`,
        role: employee.role,
        mon: { startTime: "18:00", endTime: "22:00" },
        id: employee.id,
      }));
  };

  return (
    <ShiftsContainer>
      <Title>Shifts</Title>
      <ActionBarContainer>
        <ActionBarButtonContainer>Monthly view</ActionBarButtonContainer>
        <ActionBarButtonContainer>Weekly view</ActionBarButtonContainer>
        <ActionBarButtonContainer>Filter By</ActionBarButtonContainer>
        <AddShiftButton>Assing Shift</AddShiftButton>
      </ActionBarContainer>
      {loading ? <Loading /> : <ShiftWeeklyView employees={employees} />}
    </ShiftsContainer>
  );
};

export default Shifts;

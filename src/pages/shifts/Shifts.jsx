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
import ShiftMonthlyView from "../../components/shiftMonthlyView/ShiftMonthlyView";
import DropdownMenu from "../../components/dropdownMenu/DropdownMenu";

const Shifts = () => {
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState("weekly");
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

  const getViewComponent = () => {
    if (viewType === "monthly") {
      return <ShiftMonthlyView employees={employees} />;
    } else {
      return <ShiftWeeklyView employees={employees} />;
    }
  };

  return (
    <ShiftsContainer>
      <Title>Shifts</Title>
      <ActionBarContainer>
        <ActionBarButtonContainer
          view={viewType === "monthly"}
          onClick={() => {
            setViewType("monthly");
          }}
        >
          Monthly view
        </ActionBarButtonContainer>
        <ActionBarButtonContainer
          view={viewType === "weekly"}
          onClick={() => {
            setViewType("weekly");
          }}
        >
          Weekly view
        </ActionBarButtonContainer>
        <ActionBarButtonContainer>
          <DropdownMenu
            label="Roles"
            items={["Admin", "Manager", "Employee", "Contractor"]}
          />
        </ActionBarButtonContainer>
        <ActionBarButtonContainer>
          <DropdownMenu label="Departments" items={["Manager", "FOH", "BOF"]} />
        </ActionBarButtonContainer>
        <AddShiftButton>Assing Shift</AddShiftButton>
      </ActionBarContainer>
      {loading ? <Loading /> : getViewComponent()}
    </ShiftsContainer>
  );
};

export default Shifts;

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

import { buildQueryParams } from "../../utils/buildQueryParams";
import departmentsList from "../../data/departments";
import rolesList from "../../data/roles";
import {
  getEndOfWeek,
  getStartOfWeek,
  dateFormat,
} from "../../utils/dateHelpers";
import { DateTime } from "luxon";

const Shifts = () => {
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState("weekly");
  const [employees, setEmployees] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [roles, setRoles] = useState(rolesList);
  const [departments, setDepartments] = useState(departmentsList);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const queryString = buildQueryParams({ roles, departments });
      const response = await fetch(`/api/users?${queryString}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const users = await response.json();
      // Run in a separated function.
      if (!users.length) {
        setShifts([]);
      } else {
        const startDate = DateTime.fromFormat(
          getStartOfWeek(),
          dateFormat
        ).toISO();
        const endDate = DateTime.fromFormat(getEndOfWeek(), dateFormat).toISO();
        console.log({
          data: {
            startDate,
            endDate,
            userIds: users.map((user) => user.id),
          },
        });
        const shiftQueryString = buildQueryParams({
          userIds: users.map((user) => user.id),
          startDate,
          endDate,
        });
        const answer = await fetch(`/api/shift?${shiftQueryString}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!answer.ok) {
          throw new Error(`HTTP error! status: ${answer.status}`);
        }
        const shiftsList = await answer.json();
        setShifts(shiftsList);
      }
      // run in a separated function.
      setEmployees(formatData(users));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("EmployeeList", error);
    }
  }, [roles, departments]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const handleFilter = async () => {
    const token = getCookie("token");
    const response = await fetch(
      "/api/users?roles=kitchen assistant&departments=kitchen",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    const userIds = data.map((user) => user.id);
    console.log("response", userIds);
  };

  const setValues = (identifier, values) => {
    if (identifier === "Roles") {
      setRoles(values);
    }
    if (identifier === "Departments") {
      setDepartments(values);
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
            items={rolesList}
            setValues={setValues}
            checked={roles}
          />
        </ActionBarButtonContainer>
        <ActionBarButtonContainer>
          <DropdownMenu
            label="Departments"
            items={departmentsList}
            setValues={setValues}
            checked={departments}
          />
        </ActionBarButtonContainer>
        <AddShiftButton onClick={handleFilter}>Assing Shift</AddShiftButton>
      </ActionBarContainer>
      {loading ? <Loading /> : getViewComponent()}
    </ShiftsContainer>
  );
};

export default Shifts;

import React, { useEffect, useState, useCallback } from "react";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

import Loading from "../../ui/loading/Loading";

import {
  Title,
  ActionBarContainer,
  ActionBarButtonContainer,
  AddShiftButton,
  DateSelectorContainer,
} from "./shiftDashboard.styles";

import ShiftWeeklyView from "../shiftWeeklyView/ShiftWeeklyView";
import ShiftMonthlyView from "../shiftMonthlyView/ShiftMonthlyView";
import DropdownMenu from "../../dropdownMenu/DropdownMenu";

import { buildQueryParams } from "../../../utils/buildQueryParams";
import { getCookie } from "../../../utils/cookies";
import { createEmployeeShiftArray } from "../../../utils/shiftUtils";
import {
  getEndOfWeekISO,
  getStartOfWeek,
  dateFormat,
} from "../../../utils/dateHelpers";
import WeekSelector from "../../weekSelector/WeekSelector";
import MonthSelector from "../../monthSelector/MonthSelector";

const ShiftDashboard = ({ rolesList = [], departmentsList = [] }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState(rolesList);
  const [departments, setDepartments] = useState(departmentsList);
  const [viewType, setViewType] = useState("weekly");
  const [startDate, setStartDate] = useState(
    DateTime.fromFormat(getStartOfWeek(), dateFormat).toISO()
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (rolesList.length) {
      setRoles(rolesList);
    }
  }, [rolesList]);

  useEffect(() => {
    if (departmentsList.length) {
      setDepartments(departmentsList);
    }
  }, [departmentsList]);

  const getList = (entity, entityList) => {
    if (entity.length) {
      if (entity.length === entityList.length) {
        return "";
      } else {
        return entity;
      }
    } else {
      return ["none"];
    }
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const rolesArray = getList(roles, rolesList);
      const departmentsArray = getList(departments, departmentsList);
      const queryString = buildQueryParams({
        roles: rolesArray,
        departments: departmentsArray,
      });
      const response = await fetch(`/api/users?${queryString}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const users = await response.json();
      // should run in a separated function in future.
      if (!users.length) {
        setData([]);
      } else {
        const endDate = getEndOfWeekISO(DateTime.fromISO(startDate));
        //build query strings
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
        const usersShiftData = createEmployeeShiftArray(users, shiftsList);
        setData(usersShiftData);
      }
      // should run in a separated function in future.
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("EmployeeList", error);
    }
  }, [roles, departments, startDate, departmentsList, rolesList]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getViewComponent = () => {
    if (viewType === "monthly") {
      return <ShiftMonthlyView data={data} />;
    } else {
      return <ShiftWeeklyView data={data} startDate={startDate} />;
    }
  };

  const setValues = (identifier, values) => {
    if (identifier === "Roles") {
      setRoles(values);
    }
    if (identifier === "Departments") {
      setDepartments(values);
    }
  };

  const handleNewShift = () => {
    navigate("/shifts/newShift");
  };

  return (
    <>
      <Title>Shifts</Title>
      <ActionBarContainer>
        <ActionBarButtonContainer
          active={viewType === "monthly" ? "active" : ""}
          onClick={() => {
            setViewType("monthly");
          }}
        >
          Monthly view
        </ActionBarButtonContainer>
        <ActionBarButtonContainer
          active={viewType === "weekly" ? "active" : ""}
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
        <AddShiftButton onClick={handleNewShift}>Add new shift</AddShiftButton>
      </ActionBarContainer>
      <DateSelectorContainer>
        {viewType === "weekly" ? (
          <WeekSelector weekSelected={startDate} setWeek={setStartDate} />
        ) : (
          <MonthSelector monthSelected={startDate} setMonth={setStartDate} />
        )}
      </DateSelectorContainer>
      {loading ? <Loading /> : getViewComponent()}
    </>
  );
};

export default ShiftDashboard;

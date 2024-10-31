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
} from "./shiftDashboard.styles.js";

import ShiftWeeklyView from "../shiftWeeklyView/ShiftWeeklyView";
import ShiftMonthlyView from "../shiftMonthlyView/ShiftMonthlyView";
import DropdownMenu from "../../dropdownMenu/DropdownMenu";

import { buildQueryParams } from "../../../utils/buildQueryParams";
import { getCookie } from "../../../utils/cookies";
import { createEmployeeShiftArray } from "../../../utils/shiftUtils";
import { fetchWrapper } from "../../../utils/fetchWrapper";
import {
  getEndOfWeekISO,
  getStartOfWeekISO,
  getStartOfMonthISO,
  getEndOfMonthISO,
} from "../../../utils/dateHelpers";
import WeekSelector from "../../weekSelector/WeekSelector";
import MonthSelector from "../../monthSelector/MonthSelector";

const ShiftDashboard = ({ rolesList = [], departmentsList = [] }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState(rolesList);
  const [departments, setDepartments] = useState(departmentsList);
  const [viewType, setViewType] = useState("weekly");
  const [startDate, setStartDate] = useState(getStartOfWeekISO());

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
    setLoading(true);
    try {
      const token = getCookie("token");

      const queryString = buildQueryParams({
        roles: getList(roles, rolesList),
        departments: getList(departments, departmentsList),
      });

      const users = await fetchWrapper({
        url: `${process.env.REACT_APP_BACKEND_URL}/users?${queryString}`,
        token,
      });

      if (!users.length) {
        setData([]);
        setLoading(false);
        return;
      }

      const endDate =
        viewType === "weekly"
          ? getEndOfWeekISO(DateTime.fromISO(startDate))
          : getEndOfMonthISO(DateTime.fromISO(startDate));

      const shiftQueryString = buildQueryParams({
        userIds: users.map((user) => user.id),
        startDate,
        endDate,
      });

      const shiftsList = await fetchWrapper({
        url: `${process.env.REACT_APP_BACKEND_URL}/shift?${shiftQueryString}`,
        token,
      });

      setData(createEmployeeShiftArray(users, shiftsList));
    } catch (error) {
      console.error("EmployeeList", error);
    } finally {
      setLoading(false);
    }
  }, [roles, departments, startDate, departmentsList, rolesList, viewType]);

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
            setStartDate(getStartOfMonthISO());
          }}
        >
          Monthly view
        </ActionBarButtonContainer>
        <ActionBarButtonContainer
          active={viewType === "weekly" ? "active" : ""}
          onClick={() => {
            setViewType("weekly");
            setStartDate(getStartOfWeekISO());
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

import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

import {
  Title,
  ActionBarContainer,
  ActionBarButtonContainer,
  AddTimesheetButton,
  DateSelectorContainer,
} from "./timesheetDashboard.styles";

import DropdownMenu from "../../dropdownMenu/DropdownMenu";
import WeekSelector from "../../weekSelector/WeekSelector";
import {
  getStartOfWeekISO,
  getEndOfWeekISO,
  getStartOfMonthISO,
  getEndOfMonthISO,
} from "../../../utils/dateHelpers";
import TimesheetWeeklyView from "../timesheetWeeklyView/TimesheetWeeklyView";
import TimesheetMonthlyView from "../timesheetMonthlyView/TimesheetMonthlyView";
import Loading from "../../ui/loading/Loading";
import { getCookie } from "../../../utils/cookies";
import { buildQueryParams } from "../../../utils/buildQueryParams";
import { createEmployeeTimesheetArray } from "../../../utils/timesheetUtils";
import MonthSelector from "../../monthSelector/MonthSelector";
import { fetchWrapper } from "../../../utils/fetchWrapper";

const TimesheetDashboard = ({ rolesList = [], departmentsList = [] }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [viewType, setViewType] = useState("weekly");
  const [roles, setRoles] = useState(rolesList);
  const [departments, setDepartments] = useState(departmentsList);
  const [startDate, setStartDate] = useState(getStartOfWeekISO);

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

  const setValues = (identifier, values) => {
    if (identifier === "Roles") {
      setRoles(values);
    }
    if (identifier === "Departments") {
      setDepartments(values);
    }
  };

  const getViewComponent = () => {
    if (viewType === "monthly") {
      return <TimesheetMonthlyView data={data} />;
    } else {
      return <TimesheetWeeklyView data={data} startDate={startDate} />;
    }
  };

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

      const timesheetQueryString = buildQueryParams({
        userIds: users.map((user) => user.id),
        startDate,
        endDate,
      });

      const timesheetsList = await fetchWrapper({
        url: `${process.env.REACT_APP_BACKEND_URL}/timesheet?${timesheetQueryString}`,
        token,
      });

      setData(createEmployeeTimesheetArray(users, timesheetsList));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [roles, departments, startDate, departmentsList, rolesList, viewType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Title>Timesheets</Title>;
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
        <AddTimesheetButton
          onClick={() => {
            navigate("/timesheets/new");
          }}
        >
          Add new timesheet
        </AddTimesheetButton>
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

export default TimesheetDashboard;

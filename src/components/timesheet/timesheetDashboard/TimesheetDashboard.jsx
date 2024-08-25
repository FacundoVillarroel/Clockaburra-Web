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

import departmentsList from "../../../data/departments";
import rolesList from "../../../data/roles";
import DropdownMenu from "../../dropdownMenu/DropdownMenu";
import WeekSelector from "../../weekSelector/WeekSelector";
import {
  dateFormat,
  getStartOfWeek,
  getEndOfWeek,
} from "../../../utils/dateHelpers";
import TimesheetWeeklyView from "../timesheetWeeklyView/TimesheetWeeklyView";
import TimesheetMonthlyView from "../timesheetMonthlyView/TimesheetMonthlyView";
import Loading from "../../ui/loading/Loading";
import { getCookie } from "../../../utils/cookies";
import { buildQueryParams } from "../../../utils/buildQueryParams";
import { createEmployeeTimesheetArray } from "../../../utils/timesheetUtils";

const TimesheetDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [viewType, setViewType] = useState("weekly");
  const [roles, setRoles] = useState(rolesList);
  const [departments, setDepartments] = useState(departmentsList);
  const [startDate, setStartDate] = useState(
    DateTime.fromFormat(getStartOfWeek(), dateFormat).toISO()
  );

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

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const rolesList = roles.length ? roles : ["none"];
      const departmentsList = departments.length ? departments : ["none"];
      const queryString = buildQueryParams({
        roles: rolesList,
        departments: departmentsList,
      });
      const response = await fetch(`/api/users?${queryString}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const users = await response.json();

      if (!users.length) {
        setData([]);
      } else {
        const endDate = DateTime.fromFormat(
          getEndOfWeek(DateTime.fromISO(startDate)),
          dateFormat
        ).toISO();
        //build query strings
        const timsheetQueryString = buildQueryParams({
          userIds: users.map((user) => user.id),
          startDate,
          endDate,
        });
        const answer = await fetch(`/api/timesheet?${timsheetQueryString}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!answer.ok) {
          throw new Error(`HTTP error! status: ${answer.status}`);
        }
        const timesheetsList = await answer.json();
        const usersTimesheetData = createEmployeeTimesheetArray(
          users,
          timesheetsList
        );
        setData(usersTimesheetData);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [roles, departments, startDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(data);
  return (
    <>
      <Title>Timesheets</Title>;
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
        <AddTimesheetButton
          onClick={() => {
            navigate("/timesheets/new");
          }}
        >
          Add new timesheet
        </AddTimesheetButton>
      </ActionBarContainer>
      <DateSelectorContainer>
        <WeekSelector weekSelected={startDate} setWeek={setStartDate} />
      </DateSelectorContainer>
      {loading ? <Loading /> : getViewComponent()}
    </>
  );
};

export default TimesheetDashboard;

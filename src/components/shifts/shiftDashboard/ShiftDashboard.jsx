import React, { useEffect, useState, useCallback } from "react";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

import Loading from "../../ui/loading/Loading";

import {
  Title,
  ActionBarContainer,
  ActionBarButtonContainer,
  AddShiftButton,
} from "./shiftDashboard.styles";

import ShiftWeeklyView from "../../shiftWeeklyView/ShiftWeeklyView";
import ShiftMonthlyView from "../../shiftMonthlyView/ShiftMonthlyView";
import DropdownMenu from "../../dropdownMenu/DropdownMenu";

import { buildQueryParams } from "../../../utils/buildQueryParams";
import { getCookie } from "../../../utils/cookies";
import { createEmployeeShiftArray } from "../../../utils/shiftUtils";
import {
  getEndOfWeek,
  getStartOfWeek,
  dateFormat,
} from "../../../utils/dateHelpers";
import departmentsList from "../../../data/departments";
import rolesList from "../../../data/roles";

const ShiftDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState(rolesList);
  const [departments, setDepartments] = useState(departmentsList);
  const [viewType, setViewType] = useState("weekly");
  const [startDate, setStartDate] = useState(
    DateTime.fromFormat(getStartOfWeek(), dateFormat).toISO()
  );

  const navigate = useNavigate();

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
      // should run in a separated function in future.
      if (!users.length) {
        setData([]);
      } else {
        const endDate = DateTime.fromFormat(getEndOfWeek(), dateFormat).toISO();
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
  }, [roles, departments, startDate]);

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
      {loading ? <Loading /> : getViewComponent()}
    </>
  );
};

export default ShiftDashboard;

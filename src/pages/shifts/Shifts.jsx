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
import { createEmployeeShiftArray } from "../../utils/shiftUtils";

const Shifts = () => {
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState("weekly");
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState(rolesList);
  const [departments, setDepartments] = useState(departmentsList);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const rolesList = roles.length ? roles : ["none"];
      const departmentsList = departments.length ? departments : []; // agregar "none" cuando se agregue departments a los usuarios en db.
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
        const startDate = DateTime.fromFormat(
          getStartOfWeek(),
          dateFormat
        ).toISO();
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
        if (!shiftsList || !shiftsList?.length) {
          setData([]);
        } else {
          const usersShiftData = createEmployeeShiftArray(users, shiftsList);
          setData(usersShiftData);
        }
      }
      // should run in a separated function in future.
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("EmployeeList", error);
    }
  }, [roles, departments]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getViewComponent = () => {
    if (viewType === "monthly") {
      return <ShiftMonthlyView data={data} />;
    } else {
      return <ShiftWeeklyView data={data} />;
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

  return (
    <ShiftsContainer>
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
        <AddShiftButton>Assing Shift</AddShiftButton>
      </ActionBarContainer>
      {loading ? <Loading /> : getViewComponent()}
    </ShiftsContainer>
  );
};

export default Shifts;

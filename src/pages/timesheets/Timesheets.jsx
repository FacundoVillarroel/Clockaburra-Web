import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import TimesheetDashboard from "../../components/timesheet/timesheetDashboard/TimesheetDashboard";
import NewTimesheet from "./newTimesheet/NewTimesheet";
import UpdateTimesheet from "./updateTimesheet/UpdateTimesheet";

import { TimesheetsContainer } from "./timesheets.styles";

const Timesheets = () => {
  const { roles, departments } = useSelector((state) => state.organization);
  const rolesList = roles.map((role) => role.name);
  const departmentsList = departments.map((department) => department.name);

  return (
    <TimesheetsContainer>
      <Routes>
        <Route
          path="/"
          element={
            <TimesheetDashboard
              rolesList={rolesList}
              departmentsList={departmentsList}
            />
          }
        />
        <Route path="/new" element={<NewTimesheet />} />
        <Route path="/update" element={<UpdateTimesheet />} />
      </Routes>
    </TimesheetsContainer>
  );
};

export default Timesheets;

import React from "react";
import { Routes, Route } from "react-router-dom";
import TimesheetDashboard from "../../components/timesheet/timesheetDashboard/TimesheetDashboard";
import NewTimesheet from "./newTimesheet/NewTimesheet";

import { TimesheetsContainer } from "./timesheets.styles";
import UpdateTimesheet from "./updateTimesheet/UpdateTimesheet";

const Timesheets = () => {
  return (
    <TimesheetsContainer>
      <Routes>
        <Route path="/" element={<TimesheetDashboard />} />
        <Route path="/new" element={<NewTimesheet />} />
        <Route path="/update" element={<UpdateTimesheet />} />
      </Routes>
    </TimesheetsContainer>
  );
};

export default Timesheets;

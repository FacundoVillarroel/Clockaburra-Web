import React from "react";
import { Routes, Route } from "react-router-dom";

import { ShiftsContainer } from "./shifts.styles.js";

import ShiftDashboard from "../../components/shifts/shiftDashboard/ShiftDashboard";
import NewShift from "./newShift/NewShift";
import UpdateShift from "./updateShift/UpdateShift";
import { useSelector } from "react-redux";

const Shifts = () => {
  const { roles, departments } = useSelector((state) => state.organization);
  const rolesList = roles.map((role) => role.name);
  const departmentsList = departments.map((department) => department.name);

  return (
    <ShiftsContainer>
      <Routes>
        <Route
          path="/"
          element={
            <ShiftDashboard
              rolesList={rolesList}
              departmentsList={departmentsList}
            />
          }
        />
        <Route path="/newShift" element={<NewShift />} />
        <Route path="/updateShift" element={<UpdateShift />} />
      </Routes>
    </ShiftsContainer>
  );
};

export default Shifts;

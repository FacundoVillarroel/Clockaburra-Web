import React from "react";
import { Routes, Route } from "react-router-dom";

import { ShiftsContainer } from "./shifts.styles";

import ShiftDashboard from "../../components/shifts/shiftDashboard/ShiftDashboard";
import NewShift from "./newShift/NewShift";

const Shifts = () => {
  return (
    <ShiftsContainer>
      <Routes>
        <Route path="/" element={<ShiftDashboard />} />
        <Route path="/updateShift" element={<NewShift />} />
      </Routes>
    </ShiftsContainer>
  );
};

export default Shifts;

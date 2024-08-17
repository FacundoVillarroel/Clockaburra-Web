import React from "react";
import { Routes, Route } from "react-router-dom";

import { ShiftsContainer } from "./shifts.styles";

import ShiftDashboard from "../../components/shifts/shiftDashboard/ShiftDashboard";
import NewShift from "./newShift/NewShift";
import UpdateShift from "./updateShift/UpdateShift";

const Shifts = () => {
  return (
    <ShiftsContainer>
      <Routes>
        <Route path="/" element={<ShiftDashboard />} />
        <Route path="/newShift" element={<NewShift />} />
        <Route path="/updateShift" element={<UpdateShift />} />
      </Routes>
    </ShiftsContainer>
  );
};

export default Shifts;

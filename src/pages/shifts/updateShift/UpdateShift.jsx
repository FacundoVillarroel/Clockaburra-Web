import React from "react";
import { useLocation } from "react-router-dom";

const UpdateShift = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const userId = queryParams.get("userId");
  const name = queryParams.get("name");
  const shiftId = queryParams.get("shiftId");
  const date = queryParams.get("date");
  console.log("userId", userId);
  console.log("name", name);
  console.log("shiftId", shiftId);
  console.log("date", date);
  return <div>UpdateShift</div>;
};

export default UpdateShift;

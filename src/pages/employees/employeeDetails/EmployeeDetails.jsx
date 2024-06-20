import React from "react";
import { useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const { id } = useParams();

  return <div>EmployeeDetails: {id}</div>;
};

export default EmployeeDetails;

import React from "react";
import { useSelector } from "react-redux";

import DepartmentsDashboard from "../../../components/managment/departments/DepartmentsDashboard";
import Loading from "../../../components/ui/loading/Loading";

const Departments = () => {
  const { status } = useSelector((state) => state.organization);

  return (
    <div>{status === "loading" ? <Loading /> : <DepartmentsDashboard />}</div>
  );
};

export default Departments;

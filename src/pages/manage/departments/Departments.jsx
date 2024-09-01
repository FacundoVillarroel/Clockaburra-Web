import React from "react";

import DepartmentsDashboard from "../../../components/managment/departments/DepartmentsDashboard";
import Loading from "../../../components/ui/loading/Loading";

const Departments = ({ loading }) => {
  return <div>{loading ? <Loading /> : <DepartmentsDashboard />}</div>;
};

export default Departments;

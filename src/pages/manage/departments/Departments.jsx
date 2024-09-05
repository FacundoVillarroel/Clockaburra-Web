import React from "react";
import { useSelector } from "react-redux";

import Loading from "../../../components/ui/loading/Loading";
import ManageDashboard from "../../../components/managment/dashboard/ManageDashboard";

import {
  createDepartment,
  deleteDepartment,
  updateDepartment,
} from "../../../store/reducers/organizationSlice";

const Departments = () => {
  const { status, departments } = useSelector((state) => state.organization);

  return (
    <div>
      {status === "loading" ? (
        <Loading />
      ) : (
        <ManageDashboard
          data={departments}
          entityType="Department"
          createAction={createDepartment}
          deleteAction={deleteDepartment}
          updateAction={updateDepartment}
        />
      )}
    </div>
  );
};

export default Departments;

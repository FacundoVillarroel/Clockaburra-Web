import React from "react";
import { useSelector } from "react-redux";

import Loading from "../../../components/ui/loading/Loading";
import ManageDashboard from "../../../components/managment/dashboard/ManageDashboard";

import {
  createRole,
  deleteRole,
  updateRole,
} from "../../../store/reducers/organizationSlice";

const Roles = () => {
  const { status, roles } = useSelector((state) => state.organization);

  return (
    <div>
      {status === "loading" ? (
        <Loading />
      ) : (
        <ManageDashboard
          data={roles}
          entityType="Role"
          createAction={createRole}
          deleteAction={deleteRole}
          updateAction={updateRole}
        />
      )}
    </div>
  );
};

export default Roles;

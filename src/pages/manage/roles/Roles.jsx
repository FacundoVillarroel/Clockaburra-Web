import React from "react";

import RolesDashboard from "../../../components/managment/roles/RolesDashboard";
import Loading from "../../../components/ui/loading/Loading";

const Roles = ({ loading }) => {
  return <div>{loading ? <Loading /> : <RolesDashboard />}</div>;
};

export default Roles;

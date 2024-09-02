import React from "react";
import { useSelector } from "react-redux";

import RolesDashboard from "../../../components/managment/roles/RolesDashboard";
import Loading from "../../../components/ui/loading/Loading";

const Roles = ({ loading }) => {
  const { status } = useSelector((state) => state.organization);

  return <div>{status === "loading" ? <Loading /> : <RolesDashboard />}</div>;
};

export default Roles;

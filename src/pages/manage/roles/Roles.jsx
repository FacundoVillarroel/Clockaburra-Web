import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import RolesDashboard from "../../../components/managment/roles/RolesDashboard";
import Loading from "../../../components/ui/loading/Loading";
import { getCookie } from "../../../utils/cookies";

const Roles = () => {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const response = await fetch(`/api/role`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(await response.json().message);
      }
      const data = await response.json();
      setRoles(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      navigate("/employees");
      alert(
        "An error occurred when fetching data from DataBase, please Try again later"
      );
      console.error(error);
    }
  }, [setRoles, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <div>{loading ? <Loading /> : <RolesDashboard roles={roles} />}</div>;
};

export default Roles;

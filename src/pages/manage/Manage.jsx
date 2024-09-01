import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { fetchOrganizations } from "../../store/reducers/organizationSlice";
import { getCookie } from "../../utils/cookies";
import Departments from "./departments/Departments";

import {
  ManageContainer,
  Title,
  ActionBarContainer,
  ActionBarButtonContainer,
} from "./manage.styles";
import Roles from "./roles/Roles";

const Manage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const structureType =
    location.pathname === "/manage/roles"
      ? "roles"
      : location.pathname === "/manage/departments"
      ? "departments"
      : "none";

  useEffect(() => {
    const token = getCookie("token");
    dispatch(fetchOrganizations(setLoading, token));
  }, [dispatch]);

  return (
    <ManageContainer>
      <Title>Management</Title>
      <ActionBarContainer>
        <ActionBarButtonContainer
          active={structureType === "roles" ? "active" : undefined}
          onClick={() => navigate("./roles")}
        >
          Roles
        </ActionBarButtonContainer>
        <ActionBarButtonContainer
          active={structureType === "departments" ? "active" : undefined}
          onClick={() => navigate("./departments")}
        >
          Departments
        </ActionBarButtonContainer>
      </ActionBarContainer>
      <Routes>
        <Route path="/roles" element={<Roles loading={loading} />} />
        <Route
          path="/departments"
          element={<Departments loading={loading} />}
        />
      </Routes>
    </ManageContainer>
  );
};

export default Manage;

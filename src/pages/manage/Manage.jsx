import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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

  const structureType =
    location.pathname === "/manage/roles"
      ? "roles"
      : location.pathname === "/manage/departments"
      ? "departments"
      : "none";

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
        <Route path="/roles" element={<Roles />} />
        <Route path="/departments" element={<Departments />} />
      </Routes>
    </ManageContainer>
  );
};

export default Manage;

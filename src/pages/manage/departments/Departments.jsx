import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import DepartmentsDashboard from "../../../components/managment/departments/DepartmentsDashboard";
import Loading from "../../../components/ui/loading/Loading";
import { fetchDepartments } from "../../../store/reducers/organizationSlice";
import { getCookie } from "../../../utils/cookies";

const Departments = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const token = getCookie("token");
      dispatch(fetchDepartments(setLoading, token));
    } catch (error) {
      navigate("/employees");
      alert(
        "An error occurred when fetching data from DataBase, please Try again later"
      );
      console.error(error);
    }
  }, [navigate, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <div>{loading ? <Loading /> : <DepartmentsDashboard />}</div>;
};

export default Departments;

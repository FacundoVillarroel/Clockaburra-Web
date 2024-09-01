import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departments: [],
  roles: [],
  error: null,
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    getDepartments: (state, action) => {
      state.departments = action.payload;
    },
    addDepartment: (state, action) => {
      state.departments.push(action.payload);
    },
    updateDepartments: (state, action) => {
      // Find the index of the department to modify
      const index = state.departments.findIndex(
        (department) => department.id === action.payload.id
      );
      // Modify the department if it is found
      if (index !== -1) {
        state.departments[index] = {
          ...state.departments[index],
          ...action.payload,
        };
      }
    },
    deleteDepartments: (state, action) => {
      // Find the index of the department to remove
      const index = state.departments.findIndex(
        (department) => department.id === action.payload
      );
      // Remove the department if it is found
      if (index !== -1) {
        state.departments.splice(index, 1);
      }
    },
    updateRoles: (state, action) => {
      state.roles = action.payload;
    },
  },
});

export const {
  getDepartments,
  addDepartment,
  updateDepartments,
  deleteDepartments,
  updateRoles,
} = organizationSlice.actions;

export default organizationSlice.reducer;

export const fetchDepartments = (setLoading, token) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/department`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(await response.json().message);
      }
      const data = await response.json();
      setLoading(false);
      dispatch(getDepartments(data));
    } catch (error) {
      dispatch(getDepartments([]));
      throw new Error(error);
    }
  };
};
export const updateDepartment = (id, update, setLoading, token) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/department/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(update),
      });
      const departmentUpdated = await response.json();
      if (!response.ok) {
        throw new Error(departmentUpdated.message);
      }
      dispatch(updateDepartments({ id, ...update }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  };
};

export const deleteDepartment = (id, setLoading, token) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/department/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const departmentDeleted = await response.json();
      if (!response.ok) {
        throw new Error(departmentDeleted.message);
      }
      dispatch(deleteDepartments(id));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  };
};

export const createDepartment = (department, setLoading, token) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/department`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(department),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      const newDepartment = {
        id: data.id,
        name: data.data.name,
        description: data.data.description,
      };
      dispatch(addDepartment(newDepartment));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  };
};

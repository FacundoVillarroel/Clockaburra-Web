import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  departments: [],
  roles: [],
  status: "idle",
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
    getRoles: (state, action) => {
      state.roles = action.payload;
    },
    addRole: (state, action) => {
      state.roles.push(action.payload);
    },
    updateRoles: (state, action) => {
      // Find the index of the role to modify
      const index = state.roles.findIndex(
        (role) => role.id === action.payload.id
      );
      // Modify the role if it is found
      if (index !== -1) {
        state.roles[index] = {
          ...state.roles[index],
          ...action.payload,
        };
      }
    },
    deleteRoles: (state, action) => {
      // Find the index of the role to remove
      const index = state.roles.findIndex((role) => role.id === action.payload);
      // Remove the role if it is found
      if (index !== -1) {
        state.roles.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.departments = action.payload.departments;
        state.roles = action.payload.roles;
        state.status = "succeeded";
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  getDepartments,
  addDepartment,
  updateDepartments,
  deleteDepartments,
  getRoles,
  addRole,
  updateRoles,
  deleteRoles,
} = organizationSlice.actions;

export default organizationSlice.reducer;

export const fetchOrganizations = createAsyncThunk(
  "/organization/fetchOrganizations",
  async (token) => {
    try {
      //fetch departments
      const departmentsResponse = await fetch(`/api/department`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!departmentsResponse.ok) {
        throw new Error(await departmentsResponse.json().message);
      }
      const departmentData = await departmentsResponse.json();
      //fetch roles
      const rolesResponse = await fetch(`/api/role`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!rolesResponse.ok) {
        throw new Error(await rolesResponse.json().message);
      }
      const rolesData = await rolesResponse.json();
      return { departments: departmentData, roles: rolesData };
    } catch (error) {
      throw new Error(error);
    }
  }
);

// DEPARTMENTS ACTIONS

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

// ROLES ACTIONS

export const updateRole = (id, update, setLoading, token) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/role/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(update),
      });
      const roleUpdated = await response.json();
      if (!response.ok) {
        throw new Error(roleUpdated.message);
      }
      dispatch(updateRoles({ id, ...update }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  };
};

export const deleteRole = (id, setLoading, token) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/role/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const roleDeleted = await response.json();
      if (!response.ok) {
        throw new Error(roleDeleted.message);
      }
      dispatch(deleteRoles(id));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  };
};

export const createRole = (role, setLoading, token) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/role`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(role),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      const newRole = {
        id: data.id,
        name: data.data.name,
        description: data.data.description,
      };
      dispatch(addRole(newRole));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  };
};

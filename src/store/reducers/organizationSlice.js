import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWrapper } from "../../utils/fetchWrapper";

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
      const updateDepartment = await fetchWrapper({
        url: `/api/department/${id}`,
        method: "PUT",
        body: update,
        token,
      });
      if (updateDepartment.updated) {
        dispatch(updateDepartments({ id, ...update }));
        setLoading(false);
      } else {
        throw new Error({ message: updateDepartment.message });
      }
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
      await fetchWrapper({
        url: `/api/department/${id}`,
        method: "DELETE",
        token,
      });
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
      const newDepartment = await fetchWrapper({
        url: `/api/department`,
        method: "POST",
        body: department,
        token,
      });
      dispatch(
        addDepartment({
          id: newDepartment.id,
          name: newDepartment.data.name,
          description: newDepartment.data.description,
        })
      );
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
      const updatedRole = await fetchWrapper({
        url: `/api/role/${id}`,
        method: "PUT",
        body: update,
        token,
      });
      if (updateRole.updated) {
        dispatch(updateRoles({ id, ...update }));
      } else {
        throw new Error({ message: updatedRole.message });
      }
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
      await fetchWrapper({
        url: `/api/role/${id}`,
        method: "DELETE",
        token,
      });
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
      const newRole = await fetchWrapper({
        url: `/api/role`,
        method: "POST",
        body: role,
        token,
      });
      dispatch(
        addRole({
          id: newRole.id,
          name: newRole.data.name,
          description: newRole.data.description,
        })
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  };
};

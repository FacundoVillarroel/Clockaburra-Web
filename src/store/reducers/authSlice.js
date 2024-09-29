import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, getCookie, eraseCookie } from "../../utils/cookies";

const initialState = {
  user: null,
  token: getCookie("token"),
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      eraseCookie("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(googleLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(validateToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.status = "failed";
        state.token = null;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const user = await response.json();
      const token =
        response.headers.get("Authorization")?.split(" ")[1] || null;
      if (response.status === 403) {
        throw new Error("Failed to authenticate token");
      }
      if (response.status === 400 || !token) {
        throw new Error("Incorrect email or password");
      }
      setCookie("token", token, 7); // Token expires in 7 days
      return { user, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (accessToken, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/googleLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
      });
      const user = await response.json();
      const token =
        response.headers.get("Authorization")?.split(" ")[1] || null;
      if (response.status === 403) {
        throw new Error("Failed to authenticate token");
      }
      if (response.status === 400 || !token) {
        throw new Error("Incorrect email or password");
      }
      setCookie("token", token, 7); // Token expires in 7 days
      return { user, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, { rejectWithValue }) => {
    const token = getCookie("token");
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Token is invalid");
      }
      const user = await response.json();
      const renewedToken = response.headers.get("Authorization").split(" ")[1];
      setCookie("token", renewedToken, 7);
      return { user, token: renewedToken };
    } catch (error) {
      eraseCookie("token");
      return rejectWithValue(error.message);
    }
  }
);

export default authSlice.reducer;

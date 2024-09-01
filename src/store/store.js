import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import organizationReducer from "./reducers/organizationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    organization: organizationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

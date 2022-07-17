import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import goalReducer from "../features/goals/goalSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goal: goalReducer
  },
});

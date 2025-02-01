import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./auth/authSlice";
import batchReducers from "./batchSlice";
import studentReducers from "./studentSlice";
import assignmentReducers from "./assignmentSlice";

const store = configureStore({
  reducer: {
    auth: authReducers,
    batch: batchReducers,
    student: studentReducers,
    assignment: assignmentReducers,
  },
});

export default store;

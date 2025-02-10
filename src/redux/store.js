import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./auth/authSlice";
import batchReducers from "./batchSlice";
import studentReducers from "./studentSlice";
import assignmentReducers from "./assignmentSlice";
import eventReducers from "./eventSlice";
import reviewerReducer from "./reviewerSlice";

const store = configureStore({
  reducer: {
    auth: authReducers,
    batch: batchReducers,
    student: studentReducers,
    assignment: assignmentReducers,
    event: eventReducers,
    reviewer: reviewerReducer,
  },
});

export default store;

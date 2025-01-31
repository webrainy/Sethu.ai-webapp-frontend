import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./auth/authSlice";
import batchReducers from "./batchSlice";
import studentReducers from "./studentSlice";

const store = configureStore({
  reducer: {
    auth: authReducers,
    batch: batchReducers,
    student: studentReducers
  },
});

export default store;

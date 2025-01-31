import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./auth/authSlice";
import batchReducers from "./batchSlice";

const store = configureStore({
  reducer: {
    auth: authReducers,
    batch: batchReducers,
  },
});

export default store;

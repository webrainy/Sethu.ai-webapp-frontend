import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducers,
  },
});

export default store;
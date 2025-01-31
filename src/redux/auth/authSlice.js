import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/constants";

const initialState = {
  token: "",
  loading: false,
  error: "",
};

// action for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ end_point, login_data }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${base_url + end_point}`, {
        username: login_data.email,
        password: login_data.password,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.status || "Login failed");
    }
  }
);

// register
export const register = createAsyncThunk(
  "auth/register",
  async ({ end_point, register_data }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${base_url + end_point}`, register_data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.status || "Registration failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.responseData?.access_token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });

    // signup case
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      // state.token = action.payload.responseData?.access_token;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });
  },
});

// generate reducers
const authReducers = authSlice.reducer;

export default authReducers;

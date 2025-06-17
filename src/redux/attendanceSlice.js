import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../utils/constants";

const initialState = {
  error: "",
  loading: false,
  attendance_list: [],
};

// fetch attendance
export const fetchAttendanceList = createAsyncThunk(
  "attendance/list",
  async ({ end_point, access_token, data }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${base_url + end_point}`, {
        headers: { Authorization: access_token },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Something went wrong.");
    }
  }
);

// post attendance
export const postAttendance = createAsyncThunk(
  "attendance/add",
  async ({ end_point, access_token, data }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${base_url + end_point}`, data, {
        headers: { Authorization: access_token },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Something went wrong.");
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  extraReducers: (builder) => {
    // add attendance
    builder.addCase(postAttendance.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(postAttendance.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(postAttendance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });

    // fetch attendance
    builder.addCase(fetchAttendanceList.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchAttendanceList.fulfilled, (state, action) => {
      state.loading = false;
      state.attendance_list =
        action.payload.responseCode === 200 ? action.payload.responseData : [];
    });
    builder.addCase(fetchAttendanceList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
  },
});

// generate reducers
const attendanceReducers = attendanceSlice.reducer;

export default attendanceReducers;

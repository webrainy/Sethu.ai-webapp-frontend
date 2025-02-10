import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../utils/constants";

const initialState = {
  error: "",
  loading: false,
  page_load: false,
  profile_data: [],
};

// fetch student profile & fetch student list
export const fetchStudentProfile = createAsyncThunk(
  "student/profile",
  async ({ end_point, access_token }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${base_url + end_point}`, {
        headers: { Authorization: access_token },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Fetch failed.");
    }
  }
);

// update profile & assign batch
export const updateStudentData = createAsyncThunk(
  "student/update",
  async ({ end_point, access_token, student_data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${base_url + end_point}`, student_data, {
        headers: { Authorization: access_token },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Connection failed.");
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  extraReducers: (builder) => {
    // fetch student profile
    builder.addCase(fetchStudentProfile.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchStudentProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile_data =
        action.payload.responseCode === 200 ? action.payload.responseData : [];
    });
    builder.addCase(fetchStudentProfile.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });

    // update profile & assign student
    builder.addCase(updateStudentData.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateStudentData.fulfilled, (state, action) => {
      state.loading = false;
      state.profile_data =
        action.payload.responseCode === 200 ? action.payload.responseData : [];
    });
    builder.addCase(updateStudentData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
  },
});

//   generate reducers
const studentReducers = studentSlice.reducer;

export default studentReducers;

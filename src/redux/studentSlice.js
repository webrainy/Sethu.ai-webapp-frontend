import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../utils/constants";

const initialState = {
  error: "",
  loading: false,
  profile_data: [],
};

// fetch student profile
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

const studentSlice = createSlice({
    name: "student",
    initialState,
    extraReducers: (builder) => {
      // fetch batches
      builder.addCase(fetchStudentProfile.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      });
      builder.addCase(fetchStudentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile_data =
          action.payload.responseCode === 200 ? action.payload.responseData : [];
          console.log(action.payload);
          
      });
      builder.addCase(fetchStudentProfile.rejected, (state, action) => {
        state.error = action.payload.error;
        state.loading = false;
      });
    },
  });

//   generate reducers
const studentReducers = studentSlice.reducer;

export default studentReducers;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../utils/constants";

const initialState = {
  error: "",
  assgn_loading: false,
  assignment_list: [],
};

// fetch assignment
export const fetchAssignment = createAsyncThunk(
  "student/assignment",
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

// assign assignment
export const postAssignmentToStudent = createAsyncThunk(
  "assign/assignment",
  async ({ end_point, access_token, assgn_data }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${base_url + end_point}`, assgn_data, {
        headers: { Authorization: access_token },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Something went wrong!");
    }
  }
);

const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  extraReducers: (builder) => {
    // assign assignment
    builder.addCase(postAssignmentToStudent.pending, (state, action) => {
      state.assgn_loading = true;
      state.error = "";
    });
    builder.addCase(postAssignmentToStudent.fulfilled, (state, action) => {
      state.assgn_loading = false;
    });
    builder.addCase(postAssignmentToStudent.rejected, (state, action) => {
      state.assgn_loading = false;
      state.error = action.payload.error;
    });

    // fetch assignments
    builder.addCase(fetchAssignment.pending, (state, action) => {
      state.assgn_loading = true;
      state.error = "";
    });
    builder.addCase(fetchAssignment.fulfilled, (state, action) => {
      state.assgn_loading = false;
    });
    builder.addCase(fetchAssignment.rejected, (state, action) => {
      state.assgn_loading = false;
      state.error = action.payload.error;
    });
  },
});

// generate reducers
const assignmentReducers = assignmentSlice.reducer;

export default assignmentReducers;

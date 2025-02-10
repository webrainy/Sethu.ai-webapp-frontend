import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../utils/constants";

const initialState = {
  loading: false,
  error: "",
  reviewer_item: [],
};

// add reviewer
export const postReviewerItem = createAsyncThunk(
  "reviewer/add",
  async ({ end_point, access_token, item_data }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${base_url + end_point}`, item_data, {
        headers: { Authorization: access_token },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Something went wrong!");
    }
  }
);

// list reviewers
export const listReviewerItem = createAsyncThunk(
  "reviewer/list",
  async ({ end_point, access_token }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${base_url + end_point}`, {
        headers: { Authorization: access_token },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Something went wrong!");
    }
  }
);

const reviewerSlice = createSlice({
  name: "reviewer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(postReviewerItem.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(postReviewerItem.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(postReviewerItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    // list reviewer
    builder.addCase(listReviewerItem.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(listReviewerItem.fulfilled, (state, action) => {
      state.loading = false;
      state.reviewer_item =
        action.payload.responseCode === 200 ? action.payload.responseData : [];
    });
    builder.addCase(listReviewerItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
  },
});

const reviewerReducer = reviewerSlice.reducer;

export default reviewerReducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../utils/constants";

const initialState = {
  loading: false,
  error: "",
  event_items: [],
};

// add event or interviews
export const postEventItem = createAsyncThunk(
  "event/add",
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

// list event or interviews
export const listEventItem = createAsyncThunk(
  "event/list",
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

const eventSlice = createSlice({
  name: "event",
  initialState,
  extraReducers: (builder) => {
    // add event or interviews
    builder.addCase(postEventItem.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(postEventItem.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(postEventItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });

    // list event or interviews
    builder.addCase(listEventItem.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(listEventItem.fulfilled, (state, action) => {
      state.loading = false;
      state.event_items =
        action.payload.responseCode === 200 ? action.payload.responseData : [];
    });
    builder.addCase(listEventItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
  },
});

// generate reducers
const eventReducers = eventSlice.reducer;

export default eventReducers;

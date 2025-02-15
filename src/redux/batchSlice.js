import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../utils/constants";

const initialState = {
  error: "",
  loading: false,
  batch_items: [],
  selectedItems: [],
};

// fetch all items
export const fetchBatchItems = createAsyncThunk(
  "batch/list",
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

// fetch batch details
export const fetchBatchSelectedItems = createAsyncThunk(
  "batch/select_batch",
  async ({ end_point, access_token }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${base_url + end_point}`, {
        headers: { Authorization: access_token },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Fetch failed");
    }
  }
);

// add items
export const postBatchItem = createAsyncThunk(
  "batch/add",
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

//update batch items
export const putBatchItem = createAsyncThunk(
  "batch/update",
  async ({ end_point, access_token, item_data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${base_url + end_point}`, item_data, {
        headers: { Authorization: access_token },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Something went wrong!");
    }
  }
);

const batchSlice = createSlice({
  name: "batch",
  initialState,
  extraReducers: (builder) => {
    // fetch batches
    builder.addCase(fetchBatchItems.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchBatchItems.fulfilled, (state, action) => {
      state.loading = false;
      state.batch_items =
        action.payload.responseCode === 200 ? action.payload.responseData : [];
    });
    builder.addCase(fetchBatchItems.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });

    // fetch batch details
    builder.addCase(fetchBatchSelectedItems.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchBatchSelectedItems.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedItems =
        action.payload.responseCode === 200 ? action.payload.responseData : [];
    });
    builder.addCase(fetchBatchSelectedItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });

    // add batches
    builder.addCase(postBatchItem.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(postBatchItem.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(postBatchItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });

    // update batches
    builder.addCase(putBatchItem.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(putBatchItem.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(putBatchItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
  },
});

// generate reducers
const batchReducers = batchSlice.reducer;

export default batchReducers;

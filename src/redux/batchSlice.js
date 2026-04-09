import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../utils/constants";

const initialState = {
  error: "",
  loading: false,
  batch_items: [],
  selectedItems: [],
};

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
    builder.addCase(fetchBatchItems.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchBatchItems.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.responseCode === 200) {
        const data = action.payload.responseData;
        state.batch_items = Array.isArray(data)
          ? data[0]?.batchData || []
          : data?.batchData || [];
      } else {
        state.batch_items = [];
      }
    });
    builder.addCase(fetchBatchItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error || "";
    });

    builder.addCase(fetchBatchSelectedItems.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchBatchSelectedItems.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.responseCode === 200) {
        const data = action.payload.responseData;
        // FIXED: correct path for paginated API response
        if (data?.batchData && Array.isArray(data.batchData)) {
          state.selectedItems = data.batchData;
        } else if (Array.isArray(data)) {
          state.selectedItems = data;
        } else {
          state.selectedItems = [data];
        }
      } else {
        state.selectedItems = [];
      }
    });
    builder.addCase(fetchBatchSelectedItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error || "";
    });

    builder.addCase(postBatchItem.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(postBatchItem.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(postBatchItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error || "";
    });

    builder.addCase(putBatchItem.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(putBatchItem.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(putBatchItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error || "";
    });
  },
});

const batchReducers = batchSlice.reducer;
export default batchReducers;
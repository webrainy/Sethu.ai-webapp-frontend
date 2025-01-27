import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: "",
  loading: false,
  error: "",
  isAuthenticated: false,
};

// action for login
export const login = createAsyncThunk(
  "auth/login",
  async (login_data, { rejectWithValue }) => {
    try {
    //   console.log(login_data);
      return login_data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response.status);
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
      //   state.token = action.payload.token;
      //   state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
      state.isAuthenticated = false;
    });
  },
});

// generate reducers
const authReducers = authSlice.reducer;

export default authReducers;

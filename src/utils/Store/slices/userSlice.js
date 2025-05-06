import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constants";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ emailId, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Something went wrong");
    }
  }
);

// Async thunk for signup
export const signUpUser = createAsyncThunk(
  "user/signup",
  async ({ firstName, lastName, emailId, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Something went wrong");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
      state.online = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Signup
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

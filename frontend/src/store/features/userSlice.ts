import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { KnownError } from "@/interfaces";
import {
  UserState,
  SignupUser,
  LoginUser,
  CurrentUser,
} from "@/interfaces/user";

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
  isLoggedIn: false,
};

export const signupUser = createAsyncThunk<
  CurrentUser,
  SignupUser,
  { rejectValue: string }
>("user/signup", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/users",
      userData
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data.message || "Signup failed");
  }
});

export const loginUser = createAsyncThunk<
  CurrentUser,
  LoginUser,
  { rejectValue: string }
>("user/login", async (loginData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/users/login",
      loginData
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<KnownError>;
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("An unknown error occurred");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isLoggedIn = true;
        localStorage.setItem("token", action.payload._id);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isLoggedIn = true;
        localStorage.setItem("token", action.payload._id);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;

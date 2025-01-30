import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { KnownError } from "@/interfaces";
import {
  UserState,
  SignupUser,
  LoginUser,
  CurrentUser,
} from "@/interfaces/user";

const loadUserFromStorage = (): CurrentUser | null => {
  if (typeof window !== "undefined") {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  }
  return null;
};

const initialState: UserState = {
  currentUser: loadUserFromStorage(),
  loading: false,
  error: null,
  isLoggedIn: !!loadUserFromStorage(),
};

export const signupUser = createAsyncThunk<
  CurrentUser,
  SignupUser,
  { rejectValue: string }
>("user/signup", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post<CurrentUser>(
      "http://localhost:8000/api/users",
      userData
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

export const loginUser = createAsyncThunk<
  CurrentUser,
  LoginUser,
  { rejectValue: string }
>("user/login", async (loginData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<CurrentUser>(
      "http://localhost:8000/api/users/login",
      loginData
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    document.cookie = `authToken=${data.token}; path=/; max-age=${
      30 * 24 * 60 * 60
    }; SameSite=Strict; Secure`;
    return data;
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
      localStorage.removeItem("userInfo");
      document.cookie =
        "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    },
    setUser: (state, action: PayloadAction<CurrentUser | null>) => {
      state.currentUser = action.payload;
      state.isLoggedIn = !!action.payload;
      if (action.payload) {
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
        document.cookie = `authToken=${action.payload.token}; path=/; max-age=${
          30 * 24 * 60 * 60
        }; SameSite=Strict; Secure`;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
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
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout, setUser } = userSlice.actions;

export default userSlice.reducer;

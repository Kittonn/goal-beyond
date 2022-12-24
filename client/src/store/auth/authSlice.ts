import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authAction";

const user = localStorage.getItem("user") ? localStorage.getItem("user") : null;
const userToken = localStorage.getItem("userToken")

interface UserI {
  _id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthState {
  loading: boolean;
  user: UserI | null;
  userToken: string | null;
  error: unknown;
  success: boolean;
}

const initialState: AuthState = {
  loading: false,
  user: user ? JSON.parse(user) : null,
  // user: null,
  userToken,
  error: null,
  success: false,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.userToken = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.userToken = action.payload.token;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;

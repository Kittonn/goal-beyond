import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthStateI, LoginI, RegisterI } from "../interfaces/auth.interface";
import authService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user") || "{}");

const initialState: AuthStateI = {
  user: user || {},
  status: "idle",
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user: RegisterI, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: LoginI, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload as string;
    });
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload as string;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = {};
    });
  },
});

export const { reset } = authSlice.actions;

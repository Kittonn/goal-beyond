import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "../services/goal.service";
import { GoalBodyI, GoalStateI } from "../interfaces/goal.interface";
import { UserI } from "../interfaces/auth.interface";

const initialState: GoalStateI = {
  goals: [],
  status: "idle",
  message: "",
};

export const createGoal = createAsyncThunk(
  "goals/create",
  async (goalData: GoalBodyI, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.createGoal(goalData, token);
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

export const getGoals = createAsyncThunk(
  "goals/getAll",
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.getGoals(token);
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

export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (id: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.deleteGoal(id, token);
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

export const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(createGoal.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createGoal.fulfilled, (state, action) => {
      state.status = "success";
      state.goals.push(action.payload);
    });
    builder.addCase(createGoal.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload as string;
    });
    builder.addCase(getGoals.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getGoals.fulfilled, (state, action) => {
      state.status = "success";
      state.goals = action.payload;
    });
    builder.addCase(getGoals.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload as string;
    });
    builder.addCase(deleteGoal.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteGoal.fulfilled, (state, action) => {
      state.status = "success";
      state.goals = state.goals.filter((goal) => goal._id !== action.payload);
    });
    builder.addCase(deleteGoal.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload as string;
    });
  },
});

export const { reset } = goalSlice.actions;

import { createSlice } from "@reduxjs/toolkit";
import { getGoals, deleteGoal, createGoal } from "./goalAction";

interface GoalI {
  _id: string;
  user: string;
  text: string;
  createAt: string;
  updateAt: string;
  __V: number;
}

interface GoalState {
  goals: GoalI[];
  loading: boolean;
  error: unknown;
  success: boolean;
}

const initialState: GoalState = {
  goals: [],
  loading: false,
  error: null,
  success: false,
};

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGoals.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getGoals.fulfilled, (state, action) => {
      state.loading = false;
      state.goals = action.payload;
    });
    builder.addCase(getGoals.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteGoal.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteGoal.fulfilled, (state, action) => {
      state.loading = false;
      state.goals = state.goals.filter((goal) => goal._id !== action.payload);
    });
    builder.addCase(deleteGoal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createGoal.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createGoal.fulfilled, (state, action) => {
      state.loading = false;
      state.goals.push(action.payload);
    });
    builder.addCase(createGoal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

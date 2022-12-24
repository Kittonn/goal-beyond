import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { goalSlice } from "./goal/goalSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    goals: goalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

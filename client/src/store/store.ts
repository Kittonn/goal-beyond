import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { authApi } from "./auth/authService";
import { goalSlice } from "./goal/goalSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    goals: goalSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

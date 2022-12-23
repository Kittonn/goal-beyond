import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

export const getGoals = createAsyncThunk(
  "goal/getGoals",
  async (_, thunkApi) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      };
      const { data } = await axios.get(`${BASE_URL}/goals`, config);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

interface LoginUserData {
  email: string;
  password: string;
}

interface RegisterUserData extends LoginUserData {
  name: string;
}

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginUserData, thunkApi) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/users/login`,
        { email, password },
        config
      );
      localStorage.setItem("userToken", data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }: RegisterUserData, thunkApi) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${BASE_URL}/users/`,
        { name, email, password },
        config
      );
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

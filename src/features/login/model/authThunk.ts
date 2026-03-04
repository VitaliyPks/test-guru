import { ILoginCredentials } from "./type";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { authApi } from "./authApi";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials: ILoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ошибка авторизации");
    }
  },
);

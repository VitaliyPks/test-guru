import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAuthResponse, IAuthState } from "./type";

import { loginThunk } from "./authThunk";

const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToken: (
      __,
      action: PayloadAction<{ token: string; remember: boolean }>,
    ) => {
      const { token, remember } = action.payload;

      if (remember) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("rememberMe", "true");
      } else {
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("rememberMe", "false");
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("authToken");
      localStorage.removeItem("rememberMe");
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("rememberMe");
    },
    checkAuth: (state) => {
      const token =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");

      if (token) {
        state.isAuthenticated = true;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginThunk.fulfilled,
        (state, action: PayloadAction<IAuthResponse>) => {
          state.loading = false;
          state.user = action.payload;
          state.isAuthenticated = true;
          state.error = null;
        },
      )
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { saveToken, logout, checkAuth, clearError } = authSlice.actions;

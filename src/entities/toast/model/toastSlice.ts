import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IToastState, IToast } from "./types";

const initialState: IToastState = {
  toasts: [],
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Omit<IToast, "id">>) => {
      const id =
        Date.now().toString() + Math.random().toString(36).substr(2, 9);
      state.toasts.push({
        ...action.payload,
        id,
        duration: action.payload.duration ?? 3000,
      });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload,
      );
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const { addToast, removeToast, clearToasts } =
  toastSlice.actions;

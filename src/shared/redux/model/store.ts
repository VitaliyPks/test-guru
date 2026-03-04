import { configureStore } from "@reduxjs/toolkit";

import { productsSlice } from "@entities/product";
import { toastSlice } from "@entities/toast";
import { authSlice } from "@features/login";

export const store = configureStore({
  reducer: {
    product: productsSlice.reducer,
    auth: authSlice.reducer,
    toast: toastSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

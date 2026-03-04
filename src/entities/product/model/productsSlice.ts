import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IProductsResponse, TSortField, TSortOrder } from "@shared/types";

import { fetchProducts } from "./reduxThunks";
import { IProductsState } from "./types";

const initialState: IProductsState = {
  items: [],
  total: 0,
  skip: 0,
  limit: 20,
  loading: false,
  error: null,
  searchQuery: "",
  sortBy: "title",
  sortOrder: "asc",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.skip = 0;
    },
    setSort: (
      state,
      action: PayloadAction<{ field: TSortField; order?: TSortOrder }>,
    ) => {
      if (state.sortBy === action.payload.field) {
        state.sortOrder =
          action.payload.order || (state.sortOrder === "asc" ? "desc" : "asc");
      } else {
        state.sortBy = action.payload.field;
        state.sortOrder = action.payload.order || "asc";
      }
      state.skip = 0;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.skip = (action.payload - 1) * state.limit;
    },
    resetProducts: () => initialState,
    toggleProduct: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const product = state.items.find((p) => p.id === productId);

      if (product) {
        product.chosen = !product.chosen;
      }
    },
    toggleAllProducts: (state) => {
      const allChosen = state.items.every((p) => p.chosen);

      state.items.forEach((product) => {
        product.chosen = !allChosen;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<IProductsResponse>) => {
          state.loading = false;
          state.items = action.payload.products.map((product) => ({
            ...product,
            chosen: false,
          }));
          state.total = action.payload.total;
          state.skip = action.payload.skip;
          state.limit = action.payload.limit;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSearchQuery,
  setSort,
  setPage,
  resetProducts,
  toggleProduct,
  toggleAllProducts,
} = productsSlice.actions;

import { productApi } from "@entities/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TSortField, TSortOrder } from "@shared/types";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    params: {
      limit: number;
      skip: number;
      search?: string;
      sortBy?: TSortField;
      order?: TSortOrder;
    },
    { rejectWithValue },
  ) => {
    try {
      return await productApi.getProducts(params);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch products");
    }
  },
);

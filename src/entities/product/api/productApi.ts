import { baseApi } from "@shared/api";
import { IProductsResponse, TSortField, TSortOrder } from "@shared/types";

export const productApi = {
  getProducts: (params: {
    limit: number;
    skip: number;
    search?: string;
    sortBy?: TSortField;
    order?: TSortOrder;
    select?: string;
  }) => {
    const { search, ...rest } = params;
    const endpoint = search ? "/products/search" : "/products";

    return baseApi.get<IProductsResponse>(endpoint, {
      ...rest,
      ...(search && { q: search }),
    });
  },
};

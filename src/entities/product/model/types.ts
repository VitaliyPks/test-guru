import { IProduct, TSortField, TSortOrder } from "@shared/types";

export interface IProductsState {
  items: IProduct[];
  total: number;
  skip: number;
  limit: number;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  sortBy: TSortField;
  sortOrder: TSortOrder;
}

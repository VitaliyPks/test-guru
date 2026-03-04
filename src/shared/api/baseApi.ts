import { BASE_API } from "@shared/lib";
import { IApiError } from "@shared/types";

export const baseApi = {
  async get<T>(
    endpoint: string,
    params?: Record<string, string | number>,
  ): Promise<T> {
    const queryString = params
      ? "?" +
        new URLSearchParams(
          Object.entries(params).map(([k, v]) => [k, String(v)]),
        ).toString()
      : "";

    const response = await fetch(`${BASE_API}${endpoint}${queryString}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const error: IApiError = await response.json().catch(() => ({
        message: "Request failed",
        statusCode: response.status,
      }));
      throw error;
    }

    return response.json();
  },

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await fetch(`${BASE_API}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error: IApiError = await response.json().catch(() => ({
        message: "Request failed",
        statusCode: response.status,
      }));
      throw error;
    }

    return response.json();
  },
};

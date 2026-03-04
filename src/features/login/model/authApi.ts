import { IAuthResponse, ILoginCredentials } from "./type";

import { baseApi } from "@shared/api/baseApi";

export const authApi = {
  login: (credentials: ILoginCredentials) =>
    baseApi.post<IAuthResponse>("/auth/login", {
      username: credentials.username,
      password: credentials.password,
      expiresInMins: credentials.expiresInMins ?? 30,
    }),
};

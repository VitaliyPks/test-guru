export interface ILoginCredentials {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface IAuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface IAuthState {
  user: IAuthResponse | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface IFormErrors {
  username?: string;
  password?: string;
}

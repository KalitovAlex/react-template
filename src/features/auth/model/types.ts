import { User } from "../../../shared/types/auth";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  reset: () => void;
  isAuthenticated: () => boolean;
  getUserRole: () => string | undefined;
  getUserFullName: () => string | null;
}

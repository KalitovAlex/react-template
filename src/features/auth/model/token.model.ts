import { REFRESH_TOKEN_KEY } from "../../../shared/constants/auth";

export const tokenModel = {
  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error("Error getting refresh token:", error);
      return null;
    }
  },

  setRefreshToken(token: string): void {
    try {
      if (!token) {
        throw new Error("Attempt to save empty refresh token");
      }
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
    } catch (error) {
      console.error("Error setting refresh token:", error);
    }
  },

  removeRefreshToken(): void {
    try {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error("Error removing refresh token:", error);
    }
  },
};

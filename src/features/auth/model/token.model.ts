import { t } from "../../../shared/config/localization";
import { REFRESH_TOKEN_KEY } from "../../../shared/constants/auth";

export const tokenModel = {
  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error(t.auth.loginFailed, error);
      return null;
    }
  },

  setRefreshToken(token: string): void {
    try {
      if (!token) {
        throw new Error(t.auth.invalidAuth);
      }
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
    } catch (error) {
      console.error(t.auth.loginFailed, error);
    }
  },

  removeRefreshToken(): void {
    try {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error(t.auth.loginFailed, error);
    }
  },
};

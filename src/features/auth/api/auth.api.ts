import { tokenModel } from "../model/token.model";
import { useAuthStore } from "../model/store/auth.store";
import { LoginCredentials } from "../model/types";
import { Tokens } from "../../../shared/types/auth";
import { apiInstance } from "../../../shared/api/axios";
import { AUTH_ENDPOINTS } from "../../../shared/constants";

let refreshPromise: Promise<string | null> | null = null;

export const authApi = {
  async login(credentials: LoginCredentials) {
    const { data } = await apiInstance.post<Tokens>(
      AUTH_ENDPOINTS.LOGIN,
      credentials
    );
    return data;
  },

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new Error("No refresh token provided");
    }

    const { data } = await apiInstance.post<Tokens>(AUTH_ENDPOINTS.REFRESH, {
      refreshToken: refreshToken,
    });
    return data;
  },
};

// Интерцептор для запросов
apiInstance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Интерцептор для ответов
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = refreshAccessToken();
        }
        const newAccessToken = await refreshPromise;
        refreshPromise = null;

        if (!newAccessToken) {
          throw new Error("Failed to refresh token");
        }

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiInstance(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().reset();
        tokenModel.removeRefreshToken();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

async function refreshAccessToken(): Promise<string | null> {
  try {
    const refreshToken = tokenModel.getRefreshToken();

    if (!refreshToken) {
      console.error("No refresh token found in storage");
      return null;
    }

    const tokens = await authApi.refresh(refreshToken);

    if (!tokens || !tokens.accessToken || !tokens.refreshToken) {
      console.error("Invalid tokens received from refresh request");
      return null;
    }

    useAuthStore.getState().setAccessToken(tokens.accessToken);
    useAuthStore.getState().setUser(tokens.user);
    tokenModel.setRefreshToken(tokens.refreshToken);

    return tokens.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
}

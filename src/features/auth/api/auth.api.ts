import { tokenModel } from "../model/token.model";
import { useAuthStore } from "../model/store/auth.store";
import { Tokens } from "../../../shared/types/auth";
import { apiInstance } from "../../../shared/api/axios";
import { ENDPOINTS } from "../../../shared/constants";
import { User, userApi } from "../../../entities/user";
import { LoginFormValues } from "../model/hooks/useLoginSchema";
import { SignupFormValues } from "../model/hooks/useSignupSchema";

let refreshPromise: Promise<string | null> | null = null;

export const authApi = {
  async login(credentials: LoginFormValues) {
    const { data } = await apiInstance.post<Tokens>(
      ENDPOINTS.LOGIN,
      credentials
    );
    return data;
  },

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new Error("No refresh token provided");
    }

    const { data } = await apiInstance.post<Tokens>(ENDPOINTS.REFRESH, {
      refreshToken: refreshToken,
    });
    return data;
  },

  async getSelf() {
    const { data } = await apiInstance.get<User>(ENDPOINTS.GET_SELF);
    return data;
  },

  async signup(data: SignupFormValues) {
    const { data: response } = await apiInstance.post<Tokens>(
      ENDPOINTS.SIGNUP,
      data
    );
    return response;
  },
};

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
    tokenModel.setRefreshToken(tokens.refreshToken);

    try {
      const userData = await userApi.getSelf();
      useAuthStore.getState().setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }

    return tokens.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
}

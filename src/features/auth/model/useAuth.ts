import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.api";
import { tokenModel } from "./token.model";
import { useAuthStore } from "./store/auth.store";
import { Tokens } from "../../../shared/types/auth";
import { AUTH, DASHBOARD } from "../../../shared/constants/routes";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser, setAccessToken, reset } = useAuthStore();

  const handleAuthSuccess = (data: Tokens) => {
    if (!data.accessToken || !data.refreshToken || !data.user) {
      console.error("Invalid auth data received");
      return;
    }

    try {
      setAccessToken(data.accessToken);
      setUser(data.user);
      tokenModel.setRefreshToken(data.refreshToken);
      navigate(DASHBOARD);
    } catch (error) {
      console.error("Error handling auth success:", error);
      reset();
      tokenModel.removeRefreshToken();
    }
  };

  const login = useMutation({
    mutationFn: authApi.login,
    onSuccess: handleAuthSuccess,
    onError: (error) => {
      console.error("Login error:", error);
      reset();
      tokenModel.removeRefreshToken();
    },
  });

  const logout = () => {
    try {
      reset();
      tokenModel.removeRefreshToken();
      navigate(AUTH);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return {
    login: login.mutate,
    logout,
    isLoading: login.isPending,
  };
};

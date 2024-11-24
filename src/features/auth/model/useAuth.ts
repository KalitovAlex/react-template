import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.api";
import { tokenModel } from "./token.model";
import { useAuthStore } from "./store/auth.store";
import { Tokens } from "../../../shared/types/auth";
import { AUTH, DASHBOARD } from "../../../shared/constants/routes";
import { toast } from "sonner";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser, setAccessToken, reset } = useAuthStore();

  const handleAuthSuccess = (data: Tokens) => {
    if (!data.accessToken || !data.refreshToken || !data.user) {
      toast.error("Invalid authentication data received");
      return;
    }

    try {
      setAccessToken(data.accessToken);
      setUser(data.user);
      tokenModel.setRefreshToken(data.refreshToken);
      toast.success("Successfully logged in!");
      navigate(DASHBOARD);
    } catch (error) {
      toast.error(`Error handling authentication ${error}`);
      reset();
      tokenModel.removeRefreshToken();
    }
  };

  const login = useMutation({
    mutationFn: authApi.login,
    onSuccess: handleAuthSuccess,
    onError: (error: Error) => {
      toast.error(error.message || "Login failed");
      reset();
      tokenModel.removeRefreshToken();
    },
  });

  const logout = () => {
    try {
      reset();
      tokenModel.removeRefreshToken();
      toast.success("Successfully logged out!");
      navigate(AUTH);
    } catch (error) {
      toast.error(`Error during logout: ${error}`);
    }
  };

  return {
    login: login.mutate,
    logout,
    isLoading: login.isPending,
  };
};

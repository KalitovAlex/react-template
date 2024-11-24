import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/model/store/auth.store";
import { tokenModel } from "../../../features/auth/model/token.model";
import { authApi } from "../../../features/auth/api/auth.api";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const { reset } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      const refreshToken = tokenModel.getRefreshToken();

      if (!refreshToken) {
        setIsChecking(false);
        return;
      }

      try {
        const data = await authApi.refresh(refreshToken);
        useAuthStore.getState().setAccessToken(data.accessToken);
        useAuthStore.getState().setUser(data.user);
        tokenModel.setRefreshToken(data.refreshToken);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
        reset();
        tokenModel.removeRefreshToken();
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [reset]);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

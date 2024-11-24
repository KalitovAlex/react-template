import { Navigate, useLocation } from "react-router-dom";
import { DASHBOARD } from "../../../shared/constants/routes";
import { useAuthStore } from "../../../features/auth/model/store/auth.store";
import { ReactNode } from "react";

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const accessToken = useAuthStore((state) => state.accessToken);

  if (accessToken) {
    return <Navigate to={DASHBOARD} state={{ from: location }} replace />;
  }

  return children;
};

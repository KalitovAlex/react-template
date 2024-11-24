import { Navigate } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { LoginPage } from "../../../pages/auth/ui/LoginPage";
import { HOME } from "../../../shared/constants/routes";
import { AUTH } from "../../../shared/constants/routes";
import { DASHBOARD } from "../../../shared/constants/routes";
import { DashboardPage } from "../../../pages/dashboard/ui/DashboardPage";

export const router = createBrowserRouter([
  {
    path: HOME,
    element: <Navigate to={DASHBOARD} replace />,
  },
  {
    path: AUTH,
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: DASHBOARD,
    element: (
      <PrivateRoute>
        <DashboardPage />
      </PrivateRoute>
    ),
  },
]);

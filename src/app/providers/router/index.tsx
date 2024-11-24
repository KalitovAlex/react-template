import { Navigate } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { LoginPage } from "../../../pages/auth/ui/LoginPage";
import {
  HOME,
  AUTH,
  DASHBOARD,
  REGISTER,
} from "../../../shared/constants/routes";
import { DashboardPage } from "../../../pages/dashboard/ui/DashboardPage";
import { Layout } from "../../../shared/ui/Layout/Layout";
import { SignupPage } from "../../../pages/auth/ui/SignupPage";

export const router = createBrowserRouter([
  {
    path: HOME,
    element: <Navigate to={DASHBOARD} replace />,
  },
  {
    path: AUTH,
    element: (
      <PublicRoute>
        <Layout>
          <LoginPage />
        </Layout>
      </PublicRoute>
    ),
  },
  {
    path: DASHBOARD,
    element: (
      <PrivateRoute>
        <Layout>
          <DashboardPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: REGISTER,
    element: (
      <PublicRoute>
        <Layout>
          <SignupPage />
        </Layout>
      </PublicRoute>
    ),
  },
]);

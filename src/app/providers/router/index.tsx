import { Navigate } from "react-router";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: <div>Login</div>,
  },
  {
    path: "/dashboard",
    element: <div>Dashboard</div>,
  },
  {
    path: "*",
    element: <div>Error</div>,
  },
]);

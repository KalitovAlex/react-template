import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../../../shared/ui/Layout/Layout";
import { DashboardPage } from "../../../pages/dashboard/ui/DashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <DashboardPage />
      </Layout>
    ),
  },
]);

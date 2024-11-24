import "./styles/global.css";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./providers/router";
import { RouterProvider } from "react-router-dom";
import { ToastProvider } from "./providers/toast/ToastProvider";

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root")!);
root.render(
  <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      <ToastProvider />
      <RouterProvider router={router} />
    </NextUIProvider>
  </QueryClientProvider>
);

import "./styles/global.css";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./providers/router";
import { ToastProvider } from "./providers/toast/ToastProvider";

const root = createRoot(document.getElementById("root")!);
root.render(
  <NextUIProvider>
    <ToastProvider />
    <RouterProvider router={router} />
  </NextUIProvider>
);

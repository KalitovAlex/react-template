import { Toaster } from "sonner";
import { useTheme } from "next-themes";

export const ToastProvider = () => {
  const { resolvedTheme = "light" } = useTheme();

  return (
    <Toaster
      position="top-right"
      expand
      richColors
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
};

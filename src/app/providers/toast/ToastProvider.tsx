import { Toaster } from "sonner";

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      expand
      richColors
      theme="light"
    />
  );
};

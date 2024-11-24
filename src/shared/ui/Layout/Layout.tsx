import { ReactNode } from "react";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>

      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 p-2 flex justify-center gap-2 bg-background/80 backdrop-blur-md rounded-full shadow-lg border border-default-200">
        <ThemeSwitcher />
      </footer>
    </div>
  );
};

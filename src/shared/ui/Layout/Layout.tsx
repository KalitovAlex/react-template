import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
    </div>
  );
};

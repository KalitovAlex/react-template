import { Button } from "@nextui-org/react";
import { useAuth } from "../../../features/auth/model/useAuth";
import { useAuthStore } from "../../../features/auth/model/store/auth.store";

export const DashboardPage = () => {
  const { logout } = useAuth();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-background p-4">
      <h1 className="text-2xl font-bold text-foreground mb-4">Dashboard</h1>
      {user && (
        <div className="mb-4">
          <p>
            Welcome, {user.person.firstName} {user.person.lastName}
          </p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role.name}</p>
          <p>Phone: {user.phone}</p>
        </div>
      )}
      <div className="flex gap-4">
        <Button onClick={logout} color="primary">
          Logout
        </Button>
      </div>
    </div>
  );
};

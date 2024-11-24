import { Button, Input, Card, CardBody } from "@nextui-org/react";
import { useState } from "react";
import { useAuth } from "../model/useAuth";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            isLoading={isLoading}
            className="w-full"
          >
            Login
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

import { Button, Input, Card, CardBody, CardHeader } from "@nextui-org/react";
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
    <Card className="w-full max-w-md">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">Welcome back</p>
          <p className="text-small text-default-500">Login to continue</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            isRequired
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            isRequired
            label="Password"
            placeholder="Enter your password"
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
            Sign In
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

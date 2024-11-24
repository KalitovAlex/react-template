import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useAuth } from "../model/useAuth";
import { Form } from "../../../shared/ui/Form/Form";
import { LoginCredentials } from "../model/types";

export const LoginForm = () => {
  const { login, isLoading } = useAuth();

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
    },
  ];

  const handleSubmit = (values: Record<string, string>) => {
    login(values as unknown as LoginCredentials);
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
        <Form fields={fields} onSubmit={handleSubmit}>
          <Button
            type="submit"
            color="primary"
            isLoading={isLoading}
            className="w-full"
          >
            Sign In
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

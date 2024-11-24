import { Button, Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import { useAuth } from "../model/useAuth";
import { Form } from "../../../shared/ui/Form/Form";
import { LoginFormValues, useLoginSchema } from "../model/hooks/useLoginSchema";
import { Link as RouterLink } from "react-router-dom";
import { REGISTER } from "../../../shared/constants/routes";
import { FormFieldType } from "../../../shared/ui/Form/types";
import { t } from "../../../shared/config/localization";

export const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const loginSchema = useLoginSchema();

  const fields: FormFieldType[] = [
    {
      name: "email",
      label: t.auth.email,
      type: "email",
      placeholder: t.auth.enterEmail,
      required: true,
      autoComplete: "new-password",
      className: "w-full",
    },
    {
      name: "password",
      label: t.auth.password,
      type: "password",
      placeholder: t.auth.enterPassword,
      required: true,
      autoComplete: "new-password",
      className: "w-full",
    },
  ];

  const handleSubmit = (values: LoginFormValues) => {
    login(values);
  };

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader className="flex justify-between items-center px-6 py-4">
        <div className="flex flex-col">
          <p className="text-md font-bold">{t.auth.welcomeBack}</p>
          <p className="text-small text-default-500">
            {t.auth.loginToContinue}
          </p>
        </div>
      </CardHeader>
      <CardBody className="w-full px-6">
        <Form<typeof loginSchema>
          fields={fields}
          onSubmit={handleSubmit}
          schema={loginSchema}
          className="w-full"
          autoComplete="off"
        >
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              color="primary"
              isLoading={isLoading}
              className="w-full font-bold"
            >
              {t.auth.signIn}
            </Button>
            <div className="flex justify-center items-center gap-2">
              <span className="text-small text-default-500">
                {t.auth.noAccount}
              </span>
              <Link
                as={RouterLink}
                to={REGISTER}
                size="sm"
                className="text-primary font-bold"
              >
                {t.auth.signUp}
              </Link>
            </div>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

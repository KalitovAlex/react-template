import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useAuth } from "../model/useAuth";
import { Form } from "../../../shared/ui/Form/Form";
import { FormField } from "../../../shared/ui/Form/types";
import { useTranslation } from "react-i18next";
import { LoginFormValues, useLoginSchema } from "../model/hooks/useLoginSchema";

export const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const { t } = useTranslation();
  const loginSchema = useLoginSchema();

  const fields: FormField<LoginFormValues>[] = [
    {
      name: "email",
      label: t("auth.email"),
      type: "email",
      placeholder: t("auth.enterEmail"),
      required: true,
    },
    {
      name: "password",
      label: t("auth.password"),
      type: "password",
      placeholder: t("auth.enterPassword"),
      required: true,
    },
  ];

  const handleSubmit = (values: LoginFormValues) => {
    login(values);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex justify-between items-center px-6 py-4">
        <div className="flex flex-col">
          <p className="text-md">{t("auth.welcomeBack")}</p>
          <p className="text-small text-default-500">
            {t("auth.loginToContinue")}
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <Form<typeof loginSchema>
          fields={fields}
          onSubmit={handleSubmit}
          schema={loginSchema}
        >
          <Button
            type="submit"
            color="primary"
            isLoading={isLoading}
            className="w-full"
          >
            {t("auth.signIn")}
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

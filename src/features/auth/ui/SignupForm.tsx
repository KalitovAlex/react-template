import { Button, Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import { useAuth } from "../model/useAuth";
import { Form } from "../../../shared/ui/Form/Form";
import { FormFieldType } from "../../../shared/ui/Form/types";
import {
  SignupFormValues,
  useSignupSchema,
} from "../model/hooks/useSignupSchema";
import { Link as RouterLink } from "react-router-dom";
import { AUTH } from "../../../shared/constants/routes";
import { t } from "../../../shared/config/localization";

export const SignupForm = () => {
  const { signup, isSigningUp } = useAuth();
  const signupSchema = useSignupSchema();

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
    {
      name: "person.firstName",
      label: t.auth.firstName,
      type: "text",
      placeholder: t.auth.enterFirstName,
      autoComplete: "off",
      className: "w-full",
    },
    {
      name: "person.lastName",
      label: t.auth.lastName,
      type: "text",
      placeholder: t.auth.enterLastName,
      autoComplete: "off",
      className: "w-full",
    },
    {
      name: "person.patronymicName",
      label: t.auth.patronymic,
      type: "text",
      placeholder: t.auth.enterPatronymic,
      autoComplete: "off",
      className: "w-full",
    },
  ];

  const handleSubmit = (values: SignupFormValues) => {
    signup(values);
  };

  return (
    <Card className="w-full max-w-[800px]">
      <CardHeader className="flex justify-between items-center px-6 py-4">
        <div className="flex flex-col">
          <p className="text-md font-bold">{t.auth.createAccount}</p>
          <p className="text-small text-default-500">
            {t.auth.fillInformation}
          </p>
        </div>
      </CardHeader>
      <CardBody className="w-full px-6">
        <Form<typeof signupSchema>
          fields={fields}
          onSubmit={handleSubmit}
          schema={signupSchema}
          className="w-full"
          autoComplete="off"
          layout="grid"
        >
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              color="primary"
              isLoading={isSigningUp}
              className="w-full font-bold"
            >
              {t.auth.signUp}
            </Button>
            <div className="flex justify-center items-center gap-2">
              <span className="text-small text-default-500">
                {t.auth.haveAccount}
              </span>
              <Link
                as={RouterLink}
                to={AUTH}
                size="sm"
                className="text-primary font-bold"
              >
                {t.auth.signIn}
              </Link>
            </div>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

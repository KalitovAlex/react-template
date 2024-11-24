import { useTranslation } from "react-i18next";
import { z } from "zod";

export const useSignupSchema = () => {
  const { t } = useTranslation();

  return z.object({
    email: z
      .string()
      .min(1, t("auth.validation.emailRequired"))
      .email(t("auth.validation.emailInvalid")),
    password: z
      .string()
      .min(1, t("auth.validation.passwordRequired"))
      .min(6, t("auth.validation.passwordMin", { min: 6 })),
    person: z.object({
      firstName: z.string().min(1, t("auth.validation.firstNameRequired")),
      lastName: z.string().min(1, t("auth.validation.lastNameRequired")),
      patronymicName: z
        .string()
        .min(1, t("auth.validation.patronymicRequired")),
    }),
  });
};

export type SignupFormValues = z.infer<ReturnType<typeof useSignupSchema>>;

export type SignupFormFields = {
  email: string;
  password: string;
  person: {
    firstName: string;
    lastName: string;
    patronymicName: string;
  };
};

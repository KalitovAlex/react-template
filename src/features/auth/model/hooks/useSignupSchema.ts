import { t } from "../../../../shared/config/localization";
import { z } from "zod";

export const useSignupSchema = () => {
  return z.object({
    email: z
      .string()
      .min(1, t.auth.validation.emailRequired)
      .email(t.auth.validation.emailInvalid),
    password: z
      .string()
      .min(1, t.auth.validation.passwordRequired)
      .min(6, t.auth.validation.passwordMin.replace("{{min}}", "6")),
    person: z.object({
      firstName: z.string().min(1, t.auth.validation.firstNameRequired),
      lastName: z.string().min(1, t.auth.validation.lastNameRequired),
      patronymicName: z.string().min(1, t.auth.validation.patronymicRequired),
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

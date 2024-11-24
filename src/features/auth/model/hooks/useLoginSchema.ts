import { useTranslation } from "react-i18next";
import { z } from "zod";

export const useLoginSchema = () => {
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
  });
};
export type LoginFormValues = z.infer<ReturnType<typeof useLoginSchema>>;

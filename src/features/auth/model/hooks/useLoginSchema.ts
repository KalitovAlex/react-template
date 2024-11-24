import { t } from "../../../../shared/config/localization";
import { z } from "zod";

export const useLoginSchema = () => {
  return z.object({
    email: z
      .string()
      .min(1, t.auth.validation.emailRequired)
      .email(t.auth.validation.emailInvalid),
    password: z
      .string()
      .min(1, t.auth.validation.passwordRequired)
      .min(6, t.auth.validation.passwordMin.replace("{{min}}", "6")),
  });
};

export type LoginFormValues = z.infer<ReturnType<typeof useLoginSchema>>;

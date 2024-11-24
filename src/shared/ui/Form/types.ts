import { z } from "zod";
import { Path } from "react-hook-form";

export interface FormField<T> {
  name: Path<T>;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}

export interface FormProps<T extends z.ZodObject<z.ZodRawShape>> {
  fields: FormField<z.infer<T>>[];
  onSubmit: (values: z.infer<T>) => void;
  children?: React.ReactNode;
  schema: T;
}

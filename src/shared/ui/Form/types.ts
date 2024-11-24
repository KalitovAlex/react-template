import { z } from "zod";
import { ReactNode } from "react";
import { InputProps } from "@nextui-org/react";
import { AutocompleteOption } from "../../constants";

export type InputType =
  | "text"
  | "password"
  | "email"
  | "tel"
  | "date"
  | "autocomplete";

export interface BaseInputProps
  extends Omit<InputProps, "type" | "value" | "onChange"> {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
}

export interface TextInputProps extends BaseInputProps {
  type: "text" | "password" | "email" | "tel";
}

export interface DateInputProps extends BaseInputProps {
  type: "date";
  min?: string;
  max?: string;
}

export interface AutocompleteInputProps extends BaseInputProps {
  type: "autocomplete";
  options: AutocompleteOption[];
}

export interface PhoneInputProps extends BaseInputProps {
  type: "tel";
  startContent?: ReactNode;
}

export interface PasswordInputProps extends BaseInputProps {
  type: "password";
  endContent?: ReactNode;
}

export type FormFieldType =
  | TextInputProps
  | DateInputProps
  | AutocompleteInputProps
  | PhoneInputProps
  | PasswordInputProps;

export type FormLayout = "flex" | "grid";

export interface FormProps<T extends z.ZodObject<z.ZodRawShape>> {
  fields: FormFieldType[];
  onSubmit: (values: z.infer<T>) => void;
  children?: ReactNode;
  schema: T;
  className?: string;
  autoComplete?: "on" | "off";
  layout?: FormLayout;
}

export interface FormInputProps extends BaseInputProps {
  type?: InputType;
  error?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
}

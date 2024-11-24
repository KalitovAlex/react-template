import {
  FormProps,
  FormFieldType,
  TextInputProps,
  DateInputProps,
  AutocompleteInputProps,
  PasswordInputProps,
  PhoneInputProps,
} from "./types";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInputs } from "./inputs";

export const Form = <T extends z.ZodObject<z.ZodRawShape>>({
  fields,
  onSubmit,
  children,
  schema,
  className,
  layout = "flex",
}: FormProps<T>) => {
  const methods = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
  });

  const getLayoutClass = () => {
    switch (layout) {
      case "grid":
        return "grid grid-cols-1 md:grid-cols-2 gap-4";
      case "flex":
      default:
        return "flex flex-col gap-4";
    }
  };

  const renderField = (field: FormFieldType) => {
    switch (field.type) {
      case "date":
        return (
          <FormInputs.date key={field.name} {...(field as DateInputProps)} />
        );
      case "autocomplete":
        return (
          <FormInputs.autocomplete
            key={field.name}
            {...(field as AutocompleteInputProps)}
          />
        );
      case "password":
        return (
          <FormInputs.password
            key={field.name}
            {...(field as PasswordInputProps)}
          />
        );
      case "tel":
        return (
          <FormInputs.tel key={field.name} {...(field as PhoneInputProps)} />
        );
      default:
        return (
          <FormInputs.text key={field.name} {...(field as TextInputProps)} />
        );
    }
  };

  const hiddenFields = (
    <div style={{ display: "none" }}>
      <input type="text" name="username" autoComplete="username" />
      <input type="password" name="password" autoComplete="current-password" />
    </div>
  );

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={`w-full flex flex-col gap-4 ${className || ""}`}
        autoComplete="new-password"
        spellCheck="false"
        noValidate
      >
        {hiddenFields}
        <div className={getLayoutClass()}>{fields.map(renderField)}</div>
        {children}
      </form>
    </FormProvider>
  );
};

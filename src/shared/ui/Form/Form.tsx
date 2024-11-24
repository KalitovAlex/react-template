import { Input } from "@nextui-org/react";
import { FormProps } from "./types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const Form = <T extends z.ZodObject<z.ZodRawShape>>({
  fields,
  onSubmit,
  children,
  schema,
}: FormProps<T>) => {
  type FormValues = z.infer<T>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      autoComplete="off"
      spellCheck="false"
    >
      {fields.map((field) => (
        <Input
          key={field.name}
          {...register(field.name)}
          isRequired={field.required}
          label={field.label}
          placeholder={field.placeholder}
          type={field.type}
          errorMessage={errors[field.name]?.message as string}
          isInvalid={!!errors[field.name]}
          autoComplete="new-password"
          aria-autocomplete="none"
          {...(field.type === "password" && { "data-lpignore": "true" })}
        />
      ))}
      {children}
    </form>
  );
};

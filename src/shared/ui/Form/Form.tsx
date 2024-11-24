import { useState } from "react";
import { Input } from "@nextui-org/react";
import { FormProps, FormField } from "./types";

export const Form = ({ fields, onSubmit, children }: FormProps) => {
  const [values, setValues] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      autoComplete="off"
    >
      {fields.map((field: FormField) => (
        <Input
          key={field.name}
          isRequired={field.required}
          label={field.label}
          placeholder={field.placeholder}
          type={field.type}
          value={values[field.name]}
          onChange={(e) => handleChange(field.name, e.target.value)}
          autoComplete="off"
        />
      ))}
      {children}
    </form>
  );
};

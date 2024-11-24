import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { FormInputProps } from "../types";

export const FormInput = ({
  name,
  label,
  required,
  className = "",
  containerClassName = "",
  labelClassName = "",
  autoComplete = "off",
  ...props
}: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const errorMessage = error?.message as string;

  const renderLabel = () => (
    <span className={labelClassName}>
      {label}
      {required && <span className="text-danger ml-1">*</span>}
    </span>
  );

  return (
    <div className={`w-full ${containerClassName}`}>
      <Input
        {...register(name)}
        {...props}
        label={renderLabel()}
        errorMessage={errorMessage}
        isInvalid={!!error}
        autoComplete={autoComplete}
        classNames={{
          base: "w-full",
          mainWrapper: "w-full",
          input: "w-full",
          inputWrapper: [
            "border",
            "border-default-200",
            "data-[hover=true]:border-primary",
            "group-data-[focus=true]:border-primary",
            "!bg-transparent",
            "hover:!bg-transparent",
            className,
          ],
        }}
      />
    </div>
  );
};

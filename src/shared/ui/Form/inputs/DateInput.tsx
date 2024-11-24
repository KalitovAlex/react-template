import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { DateInputProps } from "../types";

export const DateInput = ({
  name,
  label,
  placeholder,
  required,
  min,
  max,
  className = "",
  containerClassName = "",
  labelClassName = "",
  autoComplete = "off",
}: DateInputProps) => {
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
        type="date"
        label={renderLabel()}
        placeholder={placeholder}
        errorMessage={errorMessage}
        isInvalid={!!error}
        autoComplete={autoComplete}
        min={min}
        max={max}
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

import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { PhoneInputProps } from "../types";

export const PhoneInput = ({
  name,
  label,
  placeholder,
  required,
  className = "",
  containerClassName = "",
  labelClassName = "",
  autoComplete = "off",
}: PhoneInputProps) => {
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
        type="tel"
        label={renderLabel()}
        placeholder={placeholder}
        errorMessage={errorMessage}
        isInvalid={!!error}
        autoComplete={autoComplete}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">+7</span>
          </div>
        }
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

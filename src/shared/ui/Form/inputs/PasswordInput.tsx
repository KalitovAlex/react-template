import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { PasswordInputProps } from "../types";

export const PasswordInput = ({
  name,
  label,
  placeholder,
  required,
  className = "",
  containerClassName = "",
  labelClassName = "",
  autoComplete = "off",
}: PasswordInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [isVisible, setIsVisible] = useState(false);

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
        label={renderLabel()}
        placeholder={placeholder}
        endContent={
          <button type="button" onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? <EyeClosedIcon /> : <EyeIcon />}
          </button>
        }
        type={isVisible ? "text" : "password"}
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

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useFormContext, Controller } from "react-hook-form";
import { AutocompleteInputProps } from "../types";

export const AutocompleteInput = ({
  name,
  label,
  placeholder,
  required,
  options,
  className = "",
  containerClassName = "",
  labelClassName = "",
  autoComplete = "off",
}: AutocompleteInputProps) => {
  const {
    control,
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
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            label={renderLabel()}
            placeholder={placeholder}
            errorMessage={errorMessage}
            isInvalid={!!error}
            autoComplete={autoComplete}
            className={`w-full ${className}`}
            items={options}
          >
            {(item) => (
              <AutocompleteItem key={item.value} value={item.value}>
                {item.label}
              </AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />
    </div>
  );
};

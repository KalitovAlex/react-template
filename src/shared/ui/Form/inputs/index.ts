import { FormInput } from "./FormInput";
import { PasswordInput } from "./PasswordInput";
import { PhoneInput } from "./PhoneInput";
import { DateInput } from "./DateInput";
import { AutocompleteInput } from "./AutocompleteInput";
import {
  TextInputProps,
  DateInputProps,
  AutocompleteInputProps,
  PasswordInputProps,
  PhoneInputProps,
} from "../types";

type InputComponents = {
  text: React.ComponentType<TextInputProps>;
  email: React.ComponentType<TextInputProps>;
  password: React.ComponentType<PasswordInputProps>;
  tel: React.ComponentType<PhoneInputProps>;
  date: React.ComponentType<DateInputProps>;
  autocomplete: React.ComponentType<AutocompleteInputProps>;
};

export const FormInputs: InputComponents = {
  text: FormInput,
  email: FormInput,
  password: PasswordInput,
  tel: PhoneInput,
  date: DateInput,
  autocomplete: AutocompleteInput,
};

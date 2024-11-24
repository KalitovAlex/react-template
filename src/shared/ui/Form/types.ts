export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}

export interface FormProps {
  fields: FormField[];
  onSubmit: (values: Record<string, string>) => void;
  children?: React.ReactNode;
}

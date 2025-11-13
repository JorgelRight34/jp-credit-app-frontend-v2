import TextField, { TextFieldProps } from "./TextField";

export type InputProps = Omit<TextFieldProps, "onChange"> & {
  onChange?: (val: string) => void;
};

const Input = ({ onChange, ...props }: InputProps) => {
  return (
    <TextField {...props} onChange={(e) => onChange?.(e.target?.value ?? e)} />
  );
};

export default Input;

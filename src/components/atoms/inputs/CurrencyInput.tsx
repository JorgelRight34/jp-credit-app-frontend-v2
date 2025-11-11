import { NumericFormat } from "react-number-format";
import { InputProps } from "./Input";
import { forwardRef } from "react";
import TextField from "./TextField";

type CurrencyInputProps = Omit<InputProps, "type">;

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ onChange, onBlur, value, name, label, ...props }, ref) => {
    return (
      <>
        <NumericFormat
          {...props}
          customInput={TextField}
          label={label}
          thousandSeparator
          valueIsNumericString
          prefix="$"
          variant="outlined"
          defaultValue={props.defaultValue as string | null | undefined}
          value={(value as string | number | null | undefined) ?? ""}
          name={name}
          getInputRef={ref}
          onValueChange={(values) => {
            onChange?.(values.value);
          }}
          onBlur={onBlur}
        />
      </>
    );
  }
);

export default CurrencyInput;

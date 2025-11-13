import {
  NumberFormatValues,
  NumericFormat,
  NumericFormatProps,
} from "react-number-format";
import { forwardRef } from "react";
import TextField from "../input/TextField";

type PercentageInputProps = Omit<
  NumericFormatProps,
  "customInput" | "size" | "color" | "onChange"
> & {
  onChange?: (val: number | undefined) => void;
  onBlur?: () => void;
  value?: number;
  name?: string;
  max?: number;
  min?: number;
  decimalScale?: number;
};

const PercentageInput = forwardRef<HTMLInputElement, PercentageInputProps>(
  (
    {
      value,
      name,
      min = 0,
      max = 100,
      step,
      decimalScale = 2,
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    const handleValueChange = (values: NumberFormatValues) => {
      const { floatValue } = values;
      if (onChange) {
        onChange(floatValue !== undefined ? floatValue / 100 : undefined);
      }
    };

    const displayValue = value != undefined ? value * 100 : "";

    return (
      <NumericFormat
        value={displayValue}
        {...props}
        max={Number(max)}
        min={Number(min)}
        step={Number(step)}
        customInput={TextField}
        thousandSeparator=","
        decimalSeparator="."
        decimalScale={decimalScale}
        valueIsNumericString
        suffix="%"
        label=""
        name={name}
        placeholder="0.00"
        allowNegative={false}
        getInputRef={ref}
        onValueChange={handleValueChange}
        isAllowed={(values) =>
          values.floatValue === undefined || values.floatValue <= max
        }
        onBlur={onBlur}
      />
    );
  }
);

PercentageInput.displayName = "PercentageInput";

export default PercentageInput;

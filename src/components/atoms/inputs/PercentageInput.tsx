import {
  NumberFormatValues,
  NumericFormat,
  NumericFormatProps,
} from "react-number-format";
import { forwardRef } from "react";
import TextField from "./TextField";

type PercentageInputProps = Omit<
  NumericFormatProps,
  "customInput" | "size" | "color" | "onChange"
> & {
  onChange?: (val: number | undefined) => void;
  onBlur?: () => void;
  value?: number;
  name?: string;
  maxValue?: number;
  decimalScale?: number;
};

const PercentageInput = forwardRef<HTMLInputElement, PercentageInputProps>(
  (
    {
      onChange,
      onBlur,
      value,
      name,
      maxValue = 100,
      decimalScale = 2,
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
          values.floatValue === undefined || values.floatValue <= maxValue
        }
        onBlur={onBlur}
      />
    );
  }
);

export default PercentageInput;

import { SelectOptions } from "@/models";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { forwardRef, ReactNode, useMemo } from "react";
import { muiSxConfig } from "../constants";
import { toTitleCase } from "@/utils/utils";
import { InputProps } from "../input/Input";
import clsx from "clsx";
import { getIconInputSlot } from "../input/react-utils";

export type SelectInputProps = Omit<
  InputProps,
  "onChange" | "ref" | "size" | "slotProps"
> & {
  options?: SelectOptions;
  children?: ReactNode;
  label?: string;
  allowNoOption?: boolean;
  onChange?: (val: string) => void;
};

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  (
    { options, children, label, allowNoOption = true, value, icon, ...props },
    ref
  ) => {
    const possibleValues = useMemo(() => {
      return options?.map((o) => o[0]);
    }, [options]);

    const validatedValue = useMemo(() => {
      if (!possibleValues) return value;

      if (possibleValues.includes(value as string | number | null)) {
        return value;
      }
    }, [possibleValues, value]);

    return (
      <FormControl className={clsx("flex-shrink-0", props.className)} fullWidth>
        <InputLabel size="small" id={label?.toString()}>
          {label}
        </InputLabel>
        <Select
          {...props}
          size="small"
          label={label}
          labelId={label?.toString()}
          value={validatedValue ?? ""}
          ref={ref}
          onChange={(e) => props.onChange?.(e.target.value as string)}
          sx={{ width: "auto", minWidth: "fit-content", ...muiSxConfig }}
          slotProps={getIconInputSlot(icon)}
        >
          {allowNoOption && <MenuItem value={undefined}>---</MenuItem>}
          {options &&
            options.map((option, key) => (
              <MenuItem key={key} value={option[0] ?? ""}>
                {toTitleCase(option[1])}
              </MenuItem>
            ))}
          {children}
        </Select>
      </FormControl>
    );
  }
);

SelectInput.displayName = "SelectInput";

export default SelectInput;

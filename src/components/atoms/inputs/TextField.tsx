import {
  InputBaseComponentProps,
  TextField as MTextField,
} from "@mui/material";
import clsx from "clsx";
import { muiSxConfig } from "./constants";
import { ElementType } from "react";
import { getIconInputSlot, IconInputSlotProps } from "../utils/react-utils";
import { BaseTextFieldProps } from "../models/baseTextFieldProps";

export type TextFieldProps = BaseTextFieldProps & {
  onIconClick?: () => void;
  icon?: IconInputSlotProps;
  inputComponent?: ElementType<InputBaseComponentProps>;
  readOnly?: boolean;
  min?: number;
  max?: number;
  step?: number;
};

const TextField = ({
  readOnly,
  value,
  className,
  min,
  max,
  inputComponent,
  icon,
  step,
  ...props
}: TextFieldProps) => {
  return (
    <MTextField
      className={clsx("rounded-xl border-gray-200", className)}
      {...props}
      value={value ?? ""} // If value is undefined the component stops being reactive to value changes
      slotProps={{
        input: {
          value: value ?? "", // If value is undefined the component stops being reactive to value changes
          ...getIconInputSlot(icon),
          inputComponent,
          ...props.slotProps?.input,
          readOnly,
        },
        htmlInput: {
          min,
          max,
          step,
        },
        ...props.slotProps,
      }}
      sx={muiSxConfig}
      size="small"
    />
  );
};

export default TextField;

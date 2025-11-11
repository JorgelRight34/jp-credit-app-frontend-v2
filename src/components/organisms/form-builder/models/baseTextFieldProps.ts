import { TextFieldProps } from "@mui/material";

export type BaseTextFieldProps = Pick<
    TextFieldProps,
    | "value"
    | "className"
    | "slotProps"
    | "onChange"
    | "ref"
    | "type"
    | "onChange"
    | "multiline"
    | "label"
    | "defaultValue"
    | "placeholder"
    | "id"
    | "onClick"
    | "disabled"
    | "error"
    | "autoFocus"
> 
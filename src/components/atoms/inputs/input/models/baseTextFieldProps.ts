import type { TextFieldProps } from "@mui/material";

export type BaseTextFieldProps = Pick<
    TextFieldProps,
    | "value"
    | "className"
    | "slotProps"
    | "ref"
    | "type"
    | "multiline"
    | "label"
    | "defaultValue"
    | "placeholder"
    | "id"
    | "onClick"
    | "disabled"
    | "error"
    | "autoFocus"
    | "onBlur"
    | "name"
    | "autoComplete"
> 
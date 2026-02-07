import type { TextFieldProps } from "@mui/material";

export type BaseTextFieldProps = Pick<
    TextFieldProps,
    | "className"
    | "slotProps"
    | "ref"
    | "type"
    | "multiline"
    | "label"
    | "placeholder"
    | "id"
    | "onClick"
    | "disabled"
    | "error"
    | "autoFocus"
    | "onBlur"
    | "name"
    | "autoComplete"
    | "required"
> 
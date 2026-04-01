import { RefObject } from "react";
import type { Control, FieldValues, UseFormGetValues, UseFormHandleSubmit, UseFormSetValue, UseFormTrigger } from "react-hook-form";

export interface FormRef<T extends FieldValues = FieldValues> {
    control: Control<T>;
    setValue: UseFormSetValue<T>;
    getValues: UseFormGetValues<T>;
    validate: UseFormTrigger<T>;
    submit: () => void;
    handleSubmit: UseFormHandleSubmit<T>;
    reset: () => void;
}

export type PropsWithFormRef<T extends FieldValues, TOther = object> = { ref: RefObject<T | null> } & TOther

export type PropsWithFormControl<T extends FieldValues, TOther = object> = { control: Control<T> } & TOther; 
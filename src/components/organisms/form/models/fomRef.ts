import type { Control, FieldValues, UseFormGetValues, UseFormHandleSubmit, UseFormSetValue, UseFormTrigger } from "react-hook-form";

export interface FormRef<T extends FieldValues = FieldValues> {
    control: Control<T>;
    applyInterceptors: (data: T) => T
    setValue: UseFormSetValue<T>;
    getValues: UseFormGetValues<T>;
    validate: UseFormTrigger<T>;
    submit: () => void;
    handleSubmit: UseFormHandleSubmit<T>;
    reset: () => void;
}

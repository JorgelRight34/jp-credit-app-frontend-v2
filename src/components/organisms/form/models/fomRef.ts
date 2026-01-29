import type { Control, FieldValues, UseFormGetValues, UseFormSetValue, UseFormTrigger } from "react-hook-form";

export interface FormRef<T extends FieldValues = FieldValues> {
    control: Control<T>;
    applyInterceptors: (data: T) => T
    isDirty: () => boolean;
    setValue: UseFormSetValue<T>;
    getValues: UseFormGetValues<T>;
    validate: UseFormTrigger<T>;
    submit: () => void;
    reset: () => void;
}

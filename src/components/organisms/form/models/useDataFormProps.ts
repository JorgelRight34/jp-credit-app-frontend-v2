import type { FieldValues } from "react-hook-form";
import { DefaultFormValues } from "../hooks/useFormMethods";

export interface UseDataFormProps<T, TData extends FieldValues> {
    initialValues?: DefaultFormValues<TData>;
    shouldEdit?: boolean;
    resetValues?: boolean
    toastMessage?: (data?: T) => string;
    onDirtyChange?: (isDirty: boolean) => void;
    onIsValidChange?: (isValid: boolean) => void;
    onSuccess?: (data: T) => void;
}
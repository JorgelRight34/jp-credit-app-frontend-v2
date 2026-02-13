import type { FieldValues } from "react-hook-form";
import { DefaultFormValues } from "../hooks/useForm";

export interface UseDataFormProps<T, TData extends FieldValues> {
    initialValues?: DefaultFormValues<TData>;
    shouldEdit?: boolean;
    toastMessage?: () => string;
    onDirtyChange?: (isDirty: boolean) => void;
    onIsValidChange?: (isValid: boolean) => void;
    onSuccess?: (data: T) => void;
}
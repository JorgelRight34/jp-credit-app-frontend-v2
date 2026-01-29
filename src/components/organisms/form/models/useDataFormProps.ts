import type { FieldValues } from "react-hook-form";

export interface UseDataFormProps<T, TData extends FieldValues> {
    initialValues?: Partial<TData>;
    toastMessage?: string;
    onDirtyChange?: (isDirty: boolean) => void;
    onSuccess?: (data: T) => void;
}
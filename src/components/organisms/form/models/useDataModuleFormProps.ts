import type { Ref } from "react";
import type { UseDataFormProps } from "./useDataFormProps";
import type { FieldValues } from "react-hook-form";
import type { FormRef } from "./fomRef";

export type DataModuleFormProps<T = object, TData extends FieldValues = FieldValues> = UseDataFormProps<T, TData> & {
    ref?: Ref<FormRef<TData>>;
    reset?: boolean;
    shouldEdit?: boolean;
    onDirtyChange?: (isDirty: boolean) => void;
    onIsValidChange?: (isValid: boolean) => void;
    onSuccess?: (data: T) => void;
}
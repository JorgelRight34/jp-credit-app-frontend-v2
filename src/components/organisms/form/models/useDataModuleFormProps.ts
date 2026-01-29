import type { Ref } from "react";
import type { UseDataFormProps } from "./useDataFormProps";
import type { FieldValues } from "react-hook-form";
import type { FormRef } from "./fomRef";

export type UseDataModuleFormProps<T = object, TData extends FieldValues = FieldValues> = UseDataFormProps<T, TData> & {
    ref?: Ref<FormRef<TData>>;
    reset?: boolean;
    shouldEdit?: boolean;
    onDirtyChange?: (isDirty: boolean) => void;
    onSuccess?: (data: TData) => void;
}
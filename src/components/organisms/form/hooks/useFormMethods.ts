import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useRHFForm } from "react-hook-form";
import type { SchemaType } from "../models/schemaType";
import type { FieldValues } from "react-hook-form";
import { useMemo } from "react";

export type DefaultFormValues<TData> = Partial<{
    [K in keyof TData]:
    | TData[K]
    | ''
    | null
    | TData[K]
}>

export interface UseFormMethodsProps<TData extends FieldValues, TReturn> {
    schema?: SchemaType<TData>;
    defaultValues?: DefaultFormValues<TData>;
    initialValues?: Partial<TData>;
    shouldUseNativeValidation?: boolean;
    handleOnSubmit: (data: TData) => TReturn;
}

export const useFormMethods = <T extends object, TData extends FieldValues, TReturn = T>({
    schema,
    defaultValues,
    initialValues,
    shouldUseNativeValidation,
    handleOnSubmit,
}: UseFormMethodsProps<TData, TReturn>) => {
    const { control, handleSubmit, setValue, trigger, getValues, reset } = useRHFForm({
        resolver: schema ? zodResolver(schema) : undefined,
        defaultValues: defaultValues as Record<string, unknown>,
        values: initialValues,
        shouldUseNativeValidation,
    });

    return useMemo(() => ({
        control,
        getValues,
        submit: handleSubmit(handleOnSubmit),
        handleSubmit: handleSubmit,
        setValue: setValue,
        validate: trigger,
        reset,
    }), [control, getValues, handleSubmit, handleOnSubmit, setValue, trigger, reset]);
};

export type UseFormReturn<TData extends FieldValues = FieldValues> = ReturnType<typeof useFormMethods<object, TData>>;
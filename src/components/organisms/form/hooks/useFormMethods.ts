import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useRHFForm } from "react-hook-form";
import type { SchemaType } from "../models/schemaType";
import type { FieldValues } from "react-hook-form";

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
    handleOnSubmit: (data: TData) => TReturn;
}

export const useFormMethods = <T extends object, TData extends FieldValues, TReturn = T>({
    schema,
    defaultValues,
    handleOnSubmit,
}: UseFormMethodsProps<TData, TReturn>) => {
    const methods = useRHFForm({
        resolver: schema ? zodResolver(schema) : undefined,
        defaultValues: defaultValues as Record<string, unknown>,
    });

    const handleReset = () => {
        methods.reset(defaultValues, { keepErrors: false, keepDirty: false });
    };

    return {
        control: methods.control,
        methods,
        getValues: methods.getValues,
        submit: methods.handleSubmit(handleOnSubmit),
        handleSubmit: methods.handleSubmit,
        setValue: methods.setValue,
        validate: methods.trigger,
        reset: handleReset,
    };
};

export type UseFormReturn<TData extends FieldValues = FieldValues> = ReturnType<typeof useFormMethods<object, TData>>;
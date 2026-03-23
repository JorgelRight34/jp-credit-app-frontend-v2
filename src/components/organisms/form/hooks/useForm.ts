import type { SchemaType } from "../models/schemaType";
import type { FieldValues } from "react-hook-form";
import type { CacheKey } from "@/models";
import { useDataClient } from "@/hooks/useDataClient";
import { toastService } from "@/components/molecules";
import { DefaultFormValues, useFormMethods } from "./useFormMethods";
import { useCallback } from "react";

export interface UseFormBuilderProps<TData extends FieldValues, TReturn> {
    schema?: SchemaType<TData>;
    defaultValues?: DefaultFormValues<TData>;
    resetValues?: boolean;
    keysToInvalidate?: Array<CacheKey>;
    tagsToInvalidate?: Array<string>;
    shouldEdit?: boolean;
    shouldUseNativeValidation?: boolean;
    toastMessage?: (data: TReturn | undefined) => string;
    onSuccess?: (data: TReturn) => void;
    onDelete?: () => void;
    onSubmit: ((data: TData) => Promise<TReturn>);
    onEdit?: ((data: TData) => Promise<void | TReturn>);
}

export const useForm = <T extends object, TData extends FieldValues, TReturn = T>({
    schema,
    shouldEdit,
    defaultValues,
    resetValues = shouldEdit ? false : true,
    keysToInvalidate,
    shouldUseNativeValidation,
    toastMessage,
    onEdit,
    onSuccess,
    onSubmit,
}: UseFormBuilderProps<TData, TReturn>) => {
    const dataClient = useDataClient();

    const handleMutation = useCallback(async (data: TData) => {
        let result: TReturn

        if (shouldEdit) {
            result = await onEdit!(data) as TReturn
        } else {
            result = await onSubmit(data)
        }

        if (toastMessage) {
            toastService.success(toastMessage(result))
        }

        if (resetValues) methods.reset()
        if (result!) await onSuccess?.(result)
        if (!keysToInvalidate) return

        for (const key of keysToInvalidate) {
            dataClient.invalidate({ key })
        }

        return result;
    }, [shouldEdit, resetValues, keysToInvalidate, dataClient, onEdit, onSubmit, toastMessage, onSuccess])

    const methods = useFormMethods({
        schema,
        defaultValues,
        shouldUseNativeValidation,
        handleOnSubmit: handleMutation
    })

    return methods;
};


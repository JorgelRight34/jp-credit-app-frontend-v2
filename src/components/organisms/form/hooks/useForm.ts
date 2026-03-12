import type { SchemaType } from "../models/schemaType";
import type { FieldValues } from "react-hook-form";
import type { CacheKey } from "@/models";
import { useDataClient } from "@/hooks/useDataClient";
import { useDataMutation } from "@/hooks/useMutate";
import { toastService } from "@/components/molecules";
import { DefaultFormValues, useFormMethods } from "./useFormMethods";

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

    const { mutateAsync } = useDataMutation({
        mutationFn: async (data: TData) => {
            if (shouldEdit) {
                const res = await onEdit!(data);
                methods.reset()
                return res;
            }
            return await onSubmit(data)
        },
        onSuccess: async (data) => {
            if (toastMessage) {
                toastService.success(toastMessage(data ?? undefined))
            }

            if (data) await onSuccess?.(data)
            if (!keysToInvalidate) return;

            for (const key of keysToInvalidate) {
                dataClient.invalidate({ key });
            }

            if (resetValues) methods.reset();
        }
    })

    const methods = useFormMethods({
        schema,
        defaultValues,
        shouldUseNativeValidation,
        handleOnSubmit: (data) => mutateAsync(data)
    })

    return methods;
};


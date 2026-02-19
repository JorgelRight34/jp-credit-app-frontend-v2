import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useRHFForm } from "react-hook-form";
import type { SchemaType } from "../models/schemaType";
import type { UseFormBuilderReturn } from "../models/useFormBuilderReturn";
import type { FormInterceptor } from "../models/formInterceptor";
import type { FieldValues } from "react-hook-form";
import type { CacheKey } from "@/models";
import { useDataClient } from "@/hooks/useDataClient";
import { useDataMutation } from "@/hooks/useMutate";
import { toastService } from "@/components/molecules";

export type DefaultFormValues<TData> = Partial<{
    [K in keyof TData]:
    | TData[K]
    | ''
    | null
    | TData[K]
}>

export interface UseFormBuilderProps<TData, TReturn> {
    schema?: SchemaType<TData>;
    defaultValues?: DefaultFormValues<TData>;
    resetValues?: boolean;
    keysToInvalidate?: Array<CacheKey>;
    tagsToInvalidate?: Array<string>;
    shouldEdit?: boolean;
    interceptors?: Array<FormInterceptor<TData>>;
    initialValues?: Partial<TData>;
    toastMessage?: (data: TReturn | undefined) => string;
    onSuccess?: (data: TReturn) => void;
    onDelete?: () => void;
    onSubmit: ((data: TData) => Promise<TReturn>);
    onEdit?: ((data: TData) => Promise<void>);
}

export const useForm = <T extends object, TData extends FieldValues, TReturn = T>({
    schema,
    shouldEdit,
    defaultValues,
    resetValues = shouldEdit ? false : true,
    interceptors,
    keysToInvalidate,
    initialValues,
    toastMessage,
    onEdit,
    onSuccess,
    onSubmit,
}: UseFormBuilderProps<TData, TReturn>): UseFormBuilderReturn<TData> => {
    const dataClient = useDataClient();

    const { mutateAsync, isPending, isError, error } = useDataMutation({
        mutationFn: async (data: TData) => {
            if (shouldEdit && onEdit) {
                const res = await onEdit(data);
                methods.reset(data)
                return res;
            }
            return await onSubmit(data)
        },
        onSuccess: async (data) => {
            if (toastMessage) {
                toastService.success(toastMessage(data ?? undefined))
            }

            if (data) await onSuccess?.(data)
            invalidateKeys();

            if (resetValues) handleReset();
        }
    })

    const methods = useRHFForm({
        resolver: schema ? zodResolver(schema) : undefined,
        defaultValues: defaultValues as Record<string, unknown>,
        values: initialValues
    });

    const handleOnSubmit = async (data: FieldValues) => {
        await mutateAsync(applyInterceptors(data as TData));
    };

    const applyInterceptors = (data: TData) => {
        if (!interceptors) return data;

        let tmp = data;
        for (const interceptor of interceptors) {
            tmp = interceptor(tmp);
        }
        return tmp;
    }

    const invalidateKeys = () => {
        if (!keysToInvalidate) return;

        for (const key of keysToInvalidate) {
            dataClient.invalidate({ key });
        }
    }

    const handleReset = () => {
        methods.reset(defaultValues, { keepErrors: false, keepDirty: false });
    };

    return {
        form: {
            control: methods.control,
            methods,
            applyInterceptors,
            getValues: methods.getValues,
            submit: methods.handleSubmit(handleOnSubmit),
            handleSubmit: methods.handleSubmit,
            setValue: methods.setValue,
            validate: methods.trigger,
            reset: handleReset,
            resetValues: handleReset,
            watch: methods.watch,
        },
        state: {
            error,
            isPending: isPending,
            isError: isError,
        },
    } as UseFormBuilderReturn<TData>;
};


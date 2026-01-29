import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useForm as useRHFForm } from "react-hook-form";
import type { SchemaType } from "../models/schemaType";
import type { ApiError } from "../models/apiError";
import type { UseFormBuilderReturn } from "../models/useFormBuilderReturn";
import type { FormInterceptor } from "../models/formInterceptor";
import type { FormError } from "../models/formError";
import type { FieldValues } from "react-hook-form";
import type { CacheKey } from "@/models";
import { useDataClient } from "@/hooks/useDataClient";
import { useDataMutation } from "@/hooks/useMutate";
import { toastService } from "@/lib/services";

export interface UseFormBuilderProps<TData, TReturn> {
    schema?: SchemaType<TData>;
    defaultValues?: Partial<TData>;
    resetValues?: boolean;
    keysToInvalidate?: Array<CacheKey>;
    tagsToInvalidate?: Array<string>;
    shouldEdit?: boolean;
    interceptors?: Array<FormInterceptor<TData>>;
    toastMessage?: (data: TReturn) => string;
    onSuccess?: (data: TReturn) => void;
    onDelete?: () => void;
    onSubmit: ((data: TData) => Promise<TReturn>);
    onEdit?: ((data: TData) => Promise<TReturn>);
    onDirtyChange?: (val: boolean) => void;
}

export const useForm = <T extends object, TData extends FieldValues, TReturn = T>({
    schema,
    shouldEdit,
    defaultValues,
    resetValues = shouldEdit ? false : true,
    interceptors,
    keysToInvalidate,
    toastMessage,
    onDirtyChange,
    onEdit,
    onDelete,
    onSuccess,
    onSubmit,
}: UseFormBuilderProps<TData, TReturn>): UseFormBuilderReturn<TData> => {
    const [apiErrors, setApiErrors] = useState<Array<string>>([]);
    const [memoizedOnDirtyChange] = useState(() => (isDirty: boolean) => onDirtyChange?.(isDirty))
    const dataClient = useDataClient();

    const { mutateAsync, isPending, isError } = useDataMutation({
        mutationFn: async (data: TData) => {
            if (shouldEdit && onEdit) {
                const res = await onEdit(data);
                reset(data)
                return res;
            }
            return await onSubmit(data)
        },
        onSuccess: async (data) => {
            if (toastMessage) {
                toastService.success(toastMessage(data))
            }

            await onSuccess?.(data)
            invalidateKeys();
        },
        onError: (err) => {
            handleError(err)
        }
    })

    const handleOnDeleteConfig = useDataMutation({
        mutationFn: async () => {
            return await Promise.resolve(onDelete?.());
        },
        onSuccess: () => invalidateKeys(),
        onError: (err) => handleError(err)
    })

    const methods = useRHFForm({
        resolver: schema ? zodResolver(schema) : undefined,
        defaultValues: defaultValues as Record<string, unknown>
    });

    const {
        control,
        formState: { errors, isDirty },
        handleSubmit,
        reset,
        clearErrors,
        setError,
    } = methods;

    const formErrors = useMemo<Array<FormError>>(() => {
        return Object.keys(errors).map((key) => ({
            src: key,
            message: errors[key]?.message?.toString() || "",
        }));
    }, [errors]);

    const handleOnSubmit = async (data: FieldValues) => {
        await mutateAsync(applyInterceptors(data as TData));

        clearApiErrors();

        if (resetValues) handleReset();
    };

    const handleError = (err: unknown) => {
        if (!(err instanceof AxiosError)) return;

        const apiErrs = err.response?.data as ApiError | undefined;
        if (!apiErrs?.errors) return;

        Object.keys(apiErrs.errors).forEach((key) =>
            setError(key.toLowerCase(), {
                type: "manual",
                message: "Inválido",
            })
        );

        setApiErrors(Object.values(apiErrs.errors).flat());
    }

    const clearApiErrors = () => {
        if (apiErrors.length > 0) setApiErrors([]);
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
        clearErrors();
        reset(defaultValues, { keepErrors: false, keepDirty: false });
    };

    useEffect(() => {
        memoizedOnDirtyChange(isDirty)
    }, [isDirty, memoizedOnDirtyChange])

    return {
        form: {
            control,
            methods,
            applyInterceptors,
            getValues: methods.getValues,
            handleSubmit: handleSubmit(handleOnSubmit),
            handleDelete: handleOnDeleteConfig.mutateAsync,
            setValue: methods.setValue,
            validate: methods.trigger,
            reset: handleReset,
            resetValues: handleReset,
            watch: methods.watch,
        },
        state: {
            isPending: isPending || handleOnDeleteConfig.isPending,
            isError: isError || handleOnDeleteConfig.isError,
            isDirty,
        },
        validation: {
            errors,
            formErrors,
            apiErrors,
        },
    } as UseFormBuilderReturn<TData>;

};


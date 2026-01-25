import { CacheKey } from "@/models/cacheKey";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDataMutation } from "@/hooks/useMutate";
import { useDataClient } from "@/hooks/useDataClient";
import { FormError } from "../models/formError";
import { FormInterceptor } from "../models/formInterceptor";
import { ApiError } from "../models/apiError";
import { SchemaType } from "../models/schemaType";
import { invalidateTags } from "@/app/actions/cache/invalidate-tag";
import { UseFormBuilderReturn } from "../models/UseFormBuilderReturn";

export interface UseFormBuilderProps<TData extends FieldValues, TReturn> {
  schema?: SchemaType<TData>;
  defaultValues?: Partial<TData>;
  resetValues?: boolean;
  cacheKeysToInvalidate?: CacheKey[];
  tagsToInvalidate?: string[];
  interceptors?: FormInterceptor<TData>[];
  shouldEdit?: boolean;
  onSuccess?: (data: TReturn) => void;
  onSubmit: ((data: TData) => Promise<TReturn>);
  onEdit?: ((data: TData) => Promise<TReturn>);
  onDirtyChange?: (val: boolean) => void;
}

export const useFormBuilder = <T extends object, TData extends FieldValues, TReturn = T>({
  schema,
  defaultValues,
  cacheKeysToInvalidate = [],
  tagsToInvalidate,
  resetValues = true,
  interceptors = [],
  shouldEdit,
  onSubmit,
  onEdit,
  onDirtyChange,
  onSuccess,
}: UseFormBuilderProps<TData, TReturn>): UseFormBuilderReturn<TData> => {
  const [apiErrors, setApiErrors] = useState<string[]>([]);
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
      await Promise.all([
        onSuccess?.(data),
        invalidateTags(tagsToInvalidate)
      ])

      for (const key of cacheKeysToInvalidate) {
        dataClient.invalidate({ key })
      }
    }
  })

  const methods = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: defaultValues as Record<string, unknown>,
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    clearErrors,
    getValues,
    setError,
    formState: { errors, isDirty },
  } = methods;

  const formErrors = useMemo<FormError[]>(() => {
    return Object.keys(errors).map((key) => ({
      src: key,
      message: errors[key]?.message?.toString() || "",
    }));
  }, [errors]);

  const handleOnSubmit = async (data: FieldValues) => {
    try {
      await mutateAsync(applyInterceptors(data as TData));
    } catch (err) {
      if ((err instanceof AxiosError)) {
        handleApiError(err)
      }
      else {
        throw err;
      }
      return;
    }

    clearApiErrors();

    if (resetValues) handleReset();
  };

  const applyInterceptors = (data: TData) => {
    let tmp = data;
    for (const interceptor of interceptors) {
      tmp = interceptor(tmp) as TData;
    }
    return tmp;
  }

  const clearApiErrors = () => {
    if (apiErrors.length > 0) setApiErrors([]);
  };

  const handleApiError = (err: AxiosError) => {
    const apiErrs = err.response?.data as ApiError;
    if (!apiErrs?.errors) return;

    mapApiErrorsToForm(apiErrs);
    setApiErrors(Object.values(apiErrs.errors).flat());
  };

  const mapApiErrorsToForm = (apiErrs: ApiError) => {
    Object.keys(apiErrs.errors).forEach((key) =>
      setError(key.toLowerCase(), {
        type: "manual",
        message: "Inválido",
      })
    );
  };

  const handleReset = () => {
    clearErrors();
    reset(defaultValues, { keepErrors: false, keepDirty: false });
  };

  useEffect(() => {
    onDirtyChange?.(isDirty);
  }, [isDirty, onDirtyChange]);

  return {
    form: {
      control,
      methods,
      getValues,
      handleSubmit: handleSubmit(handleOnSubmit),
      setValue,
      reset: handleReset,
      resetValues: handleReset,
      watch,
    },
    state: {
      isPending,
      isError,
      isDirty,
    },
    validation: {
      errors,
      formErrors,
      apiErrors,
    },
  } as UseFormBuilderReturn<TData>;

};


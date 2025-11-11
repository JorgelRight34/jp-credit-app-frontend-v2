import { ApiError } from "@/components/EntityForm/models/apiError";
import { CacheKey } from "@/models/cacheKey";
import { FormError } from "@/components/EntityForm/models/formError";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ZodType, ZodTypeDef } from "zod";
import { useDataMutation } from "@/hooks/useMutate";
import { useDataClient } from "@/hooks/useDataClient";
import { FormInterceptor } from "@/components/EntityForm/models/formInterceptor";


export interface UseFormBuilderProps<TData extends FieldValues, TReturn> {
  schema?: ZodType<FieldValues, ZodTypeDef, FieldValues>;
  defaultValues?: Record<string, unknown> | undefined;
  resetValues?: boolean;
  cacheKeysToInvalidate?: CacheKey[];
  interceptors?: FormInterceptor<TData>[];
  onSuccess?: (data: TReturn) => void;
  onSubmit: ((data: TData) => Promise<TReturn>);
  onDirtyChange?: (val: boolean) => void;
}


export const useFormBuilder = <T extends object, TData extends FieldValues, TReturn = T>({
  schema,
  defaultValues,
  cacheKeysToInvalidate = [],
  resetValues = true,
  interceptors = [],
  onSubmit,
  onDirtyChange,
  onSuccess,
}: UseFormBuilderProps<TData, TReturn>) => {
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const dataClient = useDataClient();

  const { mutateAsync, isPending, isError } = useDataMutation({
    mutationFn: async (data: TData) => {
      return await Promise.resolve(onSubmit(data));
    },
    onSuccess: async (data) => {
      await onSuccess?.(data);
      for (const key of cacheKeysToInvalidate) {
        dataClient.invalidateQueries({ queryKey: key })
      }
    }
  })

  const methods = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: defaultValues,
  });

  const {
    control,
    register,
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
      getValues,
      register,
      handleSubmit: handleSubmit(handleOnSubmit),
      setValue,
      reset: handleReset,
      resetValues: handleReset,
      watch,
      methods,
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
  };

};


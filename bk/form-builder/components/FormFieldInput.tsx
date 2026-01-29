import {
  Controller,
  FieldValues,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { FormField } from "../models/formField";
import { useEffect, useMemo } from "react";
import { inputRenderers } from "../utils/input-renderers";

interface FormFieldInputProps<TData extends FieldValues> {
  formField: FormField<TData>;
  error?: string;
  className?: string;
  hideLabel?: boolean;
}

const FormFieldInput = <TData extends FieldValues>({
  formField: {
    watchedValues: valuesToWatch,
    disabledWhen,
    changeWhen,
    ...config
  },
  error,
  hideLabel = false,
  ...props
}: FormFieldInputProps<TData>) => {
  const { getValues, setValue } = useFormContext<TData>();

  const watchedValues = useWatch({
    name: valuesToWatch as readonly string[],
    disabled: !valuesToWatch,
  });

  const isDisabled = useMemo(() => {
    if (config.disabled !== undefined) return config.disabled;

    return !!disabledWhen?.(getValues());
  }, [config.disabled, disabledWhen, getValues]);

  useEffect(() => {
    if (changeWhen) {
      changeWhen(getValues(), setValue);
    }
  }, [changeWhen, getValues, setValue, watchedValues]);

  return (
    <Controller
      name={config.name.toString()}
      render={({ field }) => {
        const InputComponent =
          inputRenderers[config.type as keyof typeof inputRenderers] ??
          inputRenderers["default"];

        return (
          <InputComponent
            {...props}
            {...field}
            {...config}
            label={hideLabel ? undefined : config.label}
            disabled={isDisabled}
            error={!!error}
          />
        );
      }}
    />
  );
};

FormFieldInput.whyDidYouRender = true;

export default FormFieldInput;

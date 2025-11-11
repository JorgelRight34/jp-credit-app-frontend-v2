/* eslint-disable react-hooks/exhaustive-deps */
import {
  Controller,
  FieldValues,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { FormField } from "../models/formField";
import { useEffect, useMemo, useState } from "react";
import { inputRenderers } from "../inputs/input-renderers";

interface FormFieldInputProps<T, TData extends FieldValues> {
  formField: FormField<TData>;
  error?: string;
  edit?: T;
  className?: string;
  hideLabel?: boolean;
}

const FormFieldInput = <T, TData extends FieldValues>({
  formField: {
    showOnEdit,
    watchedValues: valuesToWatch,
    disabledWhen,
    changeWhen,
    ...config
  },
  edit,
  error,
  hideLabel = false,
  ...props
}: FormFieldInputProps<T, TData>) => {
  const { getValues, setValue } = useFormContext<TData>();
  const [isDisabled, setIsDisabled] = useState(config.disabled ?? false);
  const stableWatchedValuesNames = useMemo(() => valuesToWatch, []);

  const watchedValues = useWatch({
    name: stableWatchedValuesNames as readonly string[],
    disabled: !stableWatchedValuesNames,
  });

  useEffect(() => {
    if (changeWhen) {
      changeWhen(getValues(), setValue);
    }

    if (disabledWhen) {
      setIsDisabled(!!disabledWhen(getValues()));
    }
  }, [watchedValues]);

  if (edit && showOnEdit === false) return;

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

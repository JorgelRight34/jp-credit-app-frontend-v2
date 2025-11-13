import { SelectOptions } from "@/models";
import SelectInput, { SelectInputProps } from "./SelectInput";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, useWatch } from "react-hook-form";

export interface LazySelectInputProps
  extends Omit<SelectInputProps, "options"> {
  loadOptions?:
    | (() => Promise<SelectOptions>)
    | ((values: FieldValues) => Promise<SelectOptions>);
  watchedValues?: unknown[];
  ref?: React.ForwardedRef<HTMLSelectElement>;
  getValues?: () => FieldValues;
}

const LazySelectInput = ({
  watchedValues: valuesToWatch = [],
  getValues,
  loadOptions,
  ...props
}: LazySelectInputProps) => {
  const [selectOptions, setSelectOptions] = useState<SelectOptions>([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableWatchedValuesNames = useMemo(() => valuesToWatch, []);

  const watchedValues = useWatch({
    name: stableWatchedValuesNames as readonly string[],
    disabled: !stableWatchedValuesNames,
  });

  const handleGetValues = () => {
    if (getValues) return getValues();
    return () => {};
  };

  useEffect(() => {
    const getOptions = async () => {
      const response = await loadOptions!(handleGetValues());
      setSelectOptions(response);
    };
    if (loadOptions) getOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...watchedValues]);

  return <SelectInput {...props} options={selectOptions} />;
};

export default LazySelectInput;

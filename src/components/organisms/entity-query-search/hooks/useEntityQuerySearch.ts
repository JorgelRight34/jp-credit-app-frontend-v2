import { useMemo } from "react";
import { Path, useWatch } from "react-hook-form";
import { sanitizeFields } from "../utils/utils";
import { QuerySearchInput } from "../models/querySearchInput";
import { FormInterceptor } from "../../form-builder/models/formInterceptor";
import { FormField } from "../../form-builder/models/formField";
import { ReportOptions } from "@/features/reports";
import { Query } from "@/models/query";
import { useFormBuilder } from "../../form-builder";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import { useDownloadEntityReport } from "./useDownloadEntityReport";

export interface UseEntityQuerySearchProps<T extends Query, TReturn> {
  defaultValues?: Partial<T>;
  reportTitle?: string;
  fields: QuerySearchInput<T>[];
  moreFields?: QuerySearchInput<T>[];
  extraOptions?: QuerySearchInput<T>[];
  interceptors?: FormInterceptor<T>[];
  attributes?: Partial<Record<keyof T, Partial<FormField<T>>>>;
  onSubmit: (query: T) => Promise<TReturn>;
  onDownload?: (options: ReportOptions) => Promise<Blob>;
}

const useEntityQuerySearch = <T extends Query, TReturn>({
  defaultValues,
  fields: initialFields,
  moreFields: initialmoreFields,
  extraOptions,
  attributes,
  reportTitle = "",
  interceptors,
  onDownload,
  onSubmit,
}: UseEntityQuerySearchProps<T, TReturn>) => {
  const { form, validation, state } = useFormBuilder({
    defaultValues,
    interceptors,
    resetValues: false,
    onSubmit
  });

  const { fields, valuesToWatch } = useMemo(() => (
    sanitizeFields([...initialFields, ...extraOptions ?? []], { attributes, defaultValues })
  ), [initialFields, extraOptions, attributes, defaultValues])

  const { fields: moreFields, valuesToWatch: moreValuesToWatch } = useMemo(() => (
    sanitizeFields(initialmoreFields ?? [], { attributes, defaultValues })
  ), [initialmoreFields, attributes, defaultValues])

  const watchedValues = useWatch({
    control: form?.control,
    name: [...valuesToWatch, ...moreValuesToWatch] as Path<T>[],
  })

  const { download } = useDownloadEntityReport({
    onDownload,
    reportTitle,
  });

  const handleSearch = () => {
    form.handleSubmit();
  };

  const handleDownload = async (format: ReportOptions["format"]) => {
    await download({ ...form.getValues(), format })
  }

  const searchOnKeyUp = (event: React.KeyboardEvent) => {
    if (event.key.toLowerCase() === "enter") handleSearch();
  };

  useUpdateEffect(() => {
    if (watchedValues.length > 0) handleSearch()
  }, [watchedValues])

  return { fields, moreFields, form, validation, state, download: handleDownload, searchOnKeyUp, handleSearch };
};

export default useEntityQuerySearch;

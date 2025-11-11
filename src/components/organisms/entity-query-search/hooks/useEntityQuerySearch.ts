import { useMemo, useRef } from "react";
import useDownloadEntity from "./useDownload";
import { Query } from "../../../models/query";
import { QuerySearchInput, ReportOptions } from "@/models";
import { FormField, useFormBuilder } from "@/components/EntityForm";
import { Path, useWatch } from "react-hook-form";
import { useUpdateEffect } from "../../../hooks/useUpdateEffect";
import { FormInterceptor } from "@/components/EntityForm/models/formInterceptor";
import { sanitizeFields } from "../utils/utils";

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
  const valuesToWatch = useRef<(keyof T)[]>([]);

  const fields = useMemo<QuerySearchInput<T>[]>(() => {
    return sanitizeFields([...initialFields, ...extraOptions ?? []], { attributes, defaultValues, valuesToWatch })
  }, [initialFields, extraOptions, attributes, defaultValues])

  const moreFields = useMemo<QuerySearchInput<T>[]>(() => {
    return sanitizeFields(initialmoreFields ?? [], { attributes, defaultValues, valuesToWatch })
  }, [initialmoreFields, attributes, defaultValues])

  const watchedValues = useWatch({
    control: form?.control,
    name: valuesToWatch.current as Path<T>[],
  })

  const { download } = useDownloadEntity({
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

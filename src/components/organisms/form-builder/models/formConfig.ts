import { CacheKey } from "@/models";
import { FormProvider } from "./formProvider";
import { FieldValues } from "react-hook-form";

/**
 * Configuration for an entire form, including its schema, fields, and behavior.
 *
 * @template TData - The shape of the data handled by the form.
 */
export interface FormConfig<TData extends FieldValues> {
  formProvider: FormProvider<TData>;

  /**
   * Flag to whether to reset form values when the component mounts or updates.
   * Useful for clearing previous input.
   */
  resetValues?: boolean;

  /**
   * Optional form element `id` (useful for form submission or styling).
   */
  formId?: string;
  defaultValues?: Partial<TData>;

  cacheKeysToInvalidate: CacheKey[];
}
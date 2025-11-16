import { FieldValues } from "react-hook-form";
import { FormBuilderProps } from "./formBuilder";
import { FormConfig } from "./formConfig";

export interface UseEntityFormReturn<T extends object, TData extends FieldValues, TReturn = T>
  extends FormBuilderProps<T, TData, TReturn> {
  config: FormConfig<TData>;
}

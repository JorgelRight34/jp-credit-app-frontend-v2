import { FieldValues } from "react-hook-form";
import { FormConfig } from "@/components/EntityForm/models/formConfig";
import { FormBuilderProps } from "./formBuilder";

export interface UseEntityFormReturn<T extends object, TData extends FieldValues, TReturn = T>
  extends FormBuilderProps<T, TData, TReturn> {
  config: FormConfig<TData>;
}

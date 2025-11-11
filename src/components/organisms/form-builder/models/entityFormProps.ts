import { FieldValues } from "react-hook-form";
import { FormBuilderRef } from "./formBuilder";

export interface EntityFormProps<T extends FieldValues, TData = unknown> {
  onDirtyChange?: (val: boolean) => void;
  renderLayout?: boolean;
  defaultValues?: T;
  ref?: React.Ref<FormBuilderRef> | undefined;
  edit?: TData;
}

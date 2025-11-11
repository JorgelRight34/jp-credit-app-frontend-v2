import { FieldErrors, FieldValues } from "react-hook-form";
import { FormField } from "../models/formField";
import { FormLabel } from "@/components/ui";
import FormFieldInput from "./FormFieldInput";
import clsx from "clsx";

interface FormBuilderInputContainer<T, TData extends FieldValues> {
  field?: FormField<TData> | null;
  errors: FieldErrors<FieldValues>;
  edit?: T;
}

const FormBuilderInputContainer = <T, TData extends FieldValues>({
  field,
  errors,
  edit,
}: FormBuilderInputContainer<T, TData>) => {
  const error = field ? errors[field?.name]?.message : "";
  const hideIfEdit = edit && field?.showOnEdit === false;

  return (
    <div
      className={clsx("flex flex-1 flex-col", {
        "pointer-events-none order-last opacity-0": hideIfEdit,
        "!hidden": field?.type === "hidden",
      })}
    >
      {field && (
        <>
          <FormLabel>
            {field.label}
            {field.required !== false && (
              <span className="text-red-500">*</span>
            )}
          </FormLabel>
          <FormFieldInput
            formField={field}
            hideLabel={true}
            edit={edit}
            error={error as string}
          />
          {error}
        </>
      )}
    </div>
  );
};

export default FormBuilderInputContainer;

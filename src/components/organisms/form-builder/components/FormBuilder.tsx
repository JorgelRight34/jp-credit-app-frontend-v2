import { FieldValues, FormProvider } from "react-hook-form";
import React, { forwardRef, useImperativeHandle } from "react";
import FormErrors from "./FormErrors";
import { useFormBuilderLayout } from "../hooks/useFormBuilderLayout";
import FormBuilderInputContainer from "./FormBuilderInputContainer";
import {
  FormBuilderComponent,
  FormBuilderProps,
  FormBuilderRef,
} from "../models/formBuilder";

const FormBuilder = forwardRef(
  <T extends object, TData extends FieldValues>(
    {
      form: { form, state, validation },
      layout,
      fields,
      grid,
      edit,
    }: FormBuilderProps<T, TData>,
    ref: React.Ref<FormBuilderRef<TData>>,
  ) => {
    const { layout: calculatedLayout, fieldsMap } = useFormBuilderLayout({
      fields,
      layout,
      grid,
    });

    useImperativeHandle(ref, () => ({
      control: form.control,
      isDirty: state.isDirty,
      setValue: form.setValue,
      watch: form.watch,
      submit: () => form.handleSubmit(),
      reset: () => form.reset(),
      validate: () => true,
    }));

    return (
      <FormProvider {...form.methods}>
        <div className="flex flex-col space-y-3 pt-3">
          {calculatedLayout.map((row, i) => (
            <div className="flex flex-col flex-wrap gap-2 md:flex-row" key={i}>
              {row.map((column, j) => (
                <FormBuilderInputContainer
                  key={j}
                  field={fieldsMap.get(column)}
                  errors={validation.errors}
                  edit={edit}
                />
              ))}
            </div>
          ))}
        </div>
        <div>
          <FormErrors
            errors={validation.apiErrors}
            formErrors={validation.formErrors}
          />
        </div>
      </FormProvider>
    );
  },
) as FormBuilderComponent;

FormBuilder.displayName = "FormBuilder";

export default FormBuilder;

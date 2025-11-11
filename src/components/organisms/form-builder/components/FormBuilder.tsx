import { FieldValues, FormProvider } from "react-hook-form";
import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import FormErrors from "./FormErrors";
import { useFormBuilder } from "../hooks/useFormBuilder";
import { useFormBuilderLayout } from "../hooks/useFormBuilderLayout";
import FormBuilderInputContainer from "./FormBuilderInputContainer";
import {
  FormBuilderComponent,
  FormBuilderProps,
  FormBuilderRef,
} from "../models/formBuilder";
import { useQueryParams } from "@/hooks/useQueryParams";
import { getDefaultValues } from "../utils/utils";

const FormBuilder = forwardRef(
  <T extends object, TData extends FieldValues, TR>(
    {
      config: { formProvider, ...config },
      grid,
      layout: propsLayout,
      defaultValues: initialDefaultValues,
      ...props
    }: FormBuilderProps<T, TData, TR>,
    ref: React.Ref<FormBuilderRef>,
  ) => {
    const params = useQueryParams();

    const defaultValues = useMemo(
      () => ({
        ...getDefaultValues(formProvider.fields),
        ...config.defaultValues,
        ...initialDefaultValues,
        ...params,
      }),
      [config.defaultValues, formProvider.fields, initialDefaultValues, params],
    );

    const { form, validation, state } = useFormBuilder({
      ...formProvider,
      ...config,
      ...props,
      defaultValues,
      onSubmit: props.onEdit ? props.onEdit : props.onSubmit,
    });

    const { layout, fieldsMap } = useFormBuilderLayout({
      fields: formProvider.fields,
      layout: propsLayout,
      grid,
    });

    useImperativeHandle(ref, () => ({
      submit: () => form.handleSubmit(),
      reset: () => form.reset(),
      validate: () => true,
      setValue: form.setValue,
      watch: form.watch,
      control: form.control,
      isDirty: state.isDirty,
    }));

    return (
      <FormProvider {...form.methods}>
        <div className="flex flex-col space-y-3 pt-3">
          {layout.map((row, i) => (
            <div className="flex flex-col flex-wrap gap-2 md:flex-row" key={i}>
              {row.map((column, j) => (
                <FormBuilderInputContainer
                  key={j}
                  field={fieldsMap.get(column)}
                  errors={validation.errors}
                  edit={props.edit}
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

export default FormBuilder;

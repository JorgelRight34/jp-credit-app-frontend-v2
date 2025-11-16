import FormLayout, { FormLayoutProps } from "../layouts/FormLayout";
import { FieldValues } from "react-hook-form";
import { MouseEventHandler, useCallback, useRef, useState } from "react";
import { FormBuilderProps, FormBuilderRef } from "../models/formBuilder";
import FormBuilder from "./FormBuilder";

type EntityFormProps<
  T extends object,
  TData extends FieldValues
> = FormBuilderProps<T, TData> &
  Omit<FormLayoutProps, "onSubmit" | "reset" | "children">;

const EntityForm = <T extends object, TData extends FieldValues>({
  onDelete,
  onDirtyChange,
  renderLayout,
  showReset = true,
  ...props
}: EntityFormProps<T, TData>) => {
  const [isDirty, setIsDirty] = useState(false);
  const form = useRef<FormBuilderRef>(null);

  const handleOnDirtyChange = useCallback(
    (val: boolean) => {
      setIsDirty(val);
      onDirtyChange?.(val);
    },
    [onDirtyChange]
  );

  return (
    <FormLayout
      isDirty={isDirty}
      onDelete={onDelete as MouseEventHandler}
      onSubmit={() => form.current?.submit()}
      reset={() => form.current?.reset()}
      renderLayout={renderLayout}
      showReset={showReset}
    >
      <FormBuilder<T, TData>
        {...props}
        ref={form}
        onDirtyChange={handleOnDirtyChange}
      />
    </FormLayout>
  );
};

EntityForm.whyDidYouRender = true;

export default EntityForm;

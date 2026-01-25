import { Control, FieldValues, UseFormSetValue } from "react-hook-form";
import { FormLayout } from "./formLayout";
import { UseFormBuilderReturn } from "./UseFormBuilderReturn";
import { FormField } from "./formField";
import { FormGrid } from "./formGrid";

export interface FormBuilderProps<T extends object, TData extends FieldValues> {
    form: UseFormBuilderReturn<TData>;
    fields: FormField<TData>[];
    grid?: FormGrid;
    layout?: FormLayout<TData>;
    edit?: T;
}

export interface FormBuilderRef<T extends FieldValues = FieldValues> {
    control: Control<T>;
    isDirty: boolean;
    submit: () => void;
    reset: () => void;
    validate: (values?: keyof T[]) => boolean;
    setValue: UseFormSetValue<T>;
}

export type FormBuilderComponent = {
    <T extends object, TData extends FieldValues = FieldValues>(
        props: FormBuilderProps<T, TData> & { ref?: React.Ref<FormBuilderRef> }
    ): React.ReactElement;

    displayName?: string;
};
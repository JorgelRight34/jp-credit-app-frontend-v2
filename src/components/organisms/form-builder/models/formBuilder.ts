import { Control, FieldValues, UseFormSetValue } from "react-hook-form";
import { FormConfig } from "./formConfig";
import { FormGrid } from "./formGrid";
import { FormLayout } from "./formLayout";
import { FormInterceptor } from "./formInterceptor";

export interface FormBuilderProps<T extends object, TData extends FieldValues, TReturn = T> {
    config: FormConfig<TData>;
    layout?: FormLayout<TData>;
    edit?: T;
    defaultValues?: Partial<TData>;
    grid?: FormGrid;
    interceptors?: FormInterceptor<TData>[]
    onDirtyChange?: (val: boolean) => void;
    onWatch?: (values: FieldValues) => void;
    onDelete?: () => void;
    onSubmit: (data: TData) => Promise<TReturn>;
    onEdit?: (data: TData) => Promise<TReturn>;
    onSuccess?: (data: TReturn) => void;
}

export interface FormBuilderRef<T extends FieldValues = FieldValues> {
    control: Control<T>;
    isDirty: boolean;
    submit: () => void;
    reset: () => void;
    validate: (values?: keyof T[]) => boolean;
    setValue: UseFormSetValue<T>;
}

export type FormBuilderComponent = <
    T extends object,
    TData extends FieldValues = FieldValues,
    TReturn = T
>(
    props: FormBuilderProps<T, TData, TReturn> & { ref?: React.Ref<FormBuilderRef> }
) => React.ReactElement;

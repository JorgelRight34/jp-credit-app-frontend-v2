import type {
    Control,
    FieldValues,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormReturn,
    UseFormSetValue,
    UseFormTrigger,
} from "react-hook-form";

export interface UseFormBuilderReturn<TData extends FieldValues = FieldValues> {
    form: {
        control: Control<TData>;
        methods: UseFormReturn<TData>;
        applyInterceptors: (data: TData) => TData;
        getValues: UseFormGetValues<TData>;
        submit: ReturnType<UseFormHandleSubmit<TData>>;
        handleSubmit: UseFormHandleSubmit<TData>
        setValue: UseFormSetValue<TData>;
        reset: () => void;
        resetValues: () => void;
        validate: UseFormTrigger<TData>
    };
    state: {
        error: any
        isPending: boolean;
        isError: boolean;
    };
}

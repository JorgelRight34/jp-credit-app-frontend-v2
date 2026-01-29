import type {
    Control,
    FieldErrors,
    FieldValues,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormReturn,
    UseFormSetValue,
    UseFormTrigger,
    UseFormWatch
} from "react-hook-form";
import type { FormError } from "../models/formError";

export interface UseFormBuilderReturn<TData extends FieldValues> {
    form: {
        control: Control<TData>;
        methods: UseFormReturn<TData>;
        applyInterceptors: (data: TData) => TData;
        getValues: UseFormGetValues<TData>;
        handleSubmit: ReturnType<UseFormHandleSubmit<TData>>;
        handleDelete: ReturnType<UseFormHandleSubmit<object>>;
        setValue: UseFormSetValue<TData>;
        reset: () => void;
        resetValues: () => void;
        validate: UseFormTrigger<TData>
        watch: UseFormWatch<TData>;
    };
    state: {
        isPending: boolean;
        isError: boolean;
        isDirty: boolean;
    };
    validation: {
        errors: FieldErrors<TData>;
        formErrors: Array<FormError>;
        apiErrors: Array<string>;
    };
}

import {
    Control,
    FieldErrors,
    FieldValues,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormReturn,
    UseFormSetValue,
    UseFormWatch
} from "react-hook-form";
import { FormError } from "./formError";

export interface UseFormBuilderReturn<TData extends FieldValues> {
    form: {
        control: Control<TData>;
        methods: UseFormReturn<TData>;
        getValues: UseFormGetValues<TData>;
        handleSubmit: ReturnType<UseFormHandleSubmit<TData>>;
        handleDelete?: ReturnType<UseFormHandleSubmit<object>>;
        setValue: UseFormSetValue<TData>;
        reset: () => void;
        resetValues: () => void;
        watch: UseFormWatch<TData>;
    };
    state: {
        isPending: boolean;
        isError: boolean;
        isDirty: boolean;
    };
    validation: {
        errors: FieldErrors<TData>;
        formErrors: FormError[];
        apiErrors: string[];
    };
}

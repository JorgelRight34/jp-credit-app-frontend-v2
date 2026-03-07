import { login } from "../services/authService";
import type { LoginResult } from "../models/loginResult";
import type { UseDataFormProps } from "@/components";
import { useForm } from "@/components";
import { ACCESS_TOKEN } from "@/lib/utils";

export interface LoginFormValues {
    username: string;
    password: string;
}

export const useLoginForm = ({ onSuccess, ...props }: UseDataFormProps<LoginResult, LoginFormValues>) => {
    return useForm({
        ...props,
        onSubmit: login,
        defaultValues: { username: "", password: "" },
        resetValues: false,
        shouldUseNativeValidation: true,
        toastMessage: () => `Bienvenido!`,
        onSuccess: (data) => {
            localStorage.setItem(ACCESS_TOKEN, data.token)
            onSuccess?.(data);
        },
    });
};

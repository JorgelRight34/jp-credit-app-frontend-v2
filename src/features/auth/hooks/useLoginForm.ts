import { loginSchema } from "../lib/schemas/loginSchema";
import { login } from "../services/authService";
import type { LoginResult } from "../models/loginResult";
import type { LoginSchemaType } from "../lib/schemas/loginSchema";
import type { UseDataFormProps, UseFormBuilderReturn } from "@/components";
import { useForm } from "@/components";
import { ACCESS_TOKEN } from "@/lib/utils";

export const useLoginForm = ({ onSuccess, ...props }: UseDataFormProps<LoginResult, LoginSchemaType>): UseFormBuilderReturn<LoginSchemaType> => {
    return useForm({
        ...props,
        onSubmit: login,
        defaultValues: { username: "", password: "" },
        schema: loginSchema,
        resetValues: false,
        toastMessage: () => `Bienvenido!`,
        onSuccess: (data) => {
            localStorage.setItem(ACCESS_TOKEN, data.token)
            alert("Redirecting")
            onSuccess?.(data);
        },
    });
};

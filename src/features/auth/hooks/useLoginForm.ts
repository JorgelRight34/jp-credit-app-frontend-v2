import { loginSchema } from "../lib/schemas/loginSchema";
import { login } from "../services/authService";
import type { LoginSchemaType } from "../lib/schemas/loginSchema";
import type { UseDataModuleFormProps, UseFormBuilderReturn } from "@/components";
import { useForm } from "@/components";
import { ACCESS_TOKEN } from "@/lib/utils";

export const useLoginForm = ({ ...props }: UseDataModuleFormProps): UseFormBuilderReturn<LoginSchemaType> => {

    return useForm({
        ...props,
        onSubmit: login,
        defaultValues: { username: "", password: "" },
        schema: loginSchema,
        toastMessage: () => `Bienvenido!`,
        onSuccess: ({ token }) => {
            localStorage.setItem(ACCESS_TOKEN, token)
        },
    });
};

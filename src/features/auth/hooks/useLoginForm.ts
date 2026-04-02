import { login } from "../services/authService";
import type { LoginResult } from "../models/loginResult";
import type { UseDataFormProps } from "@/components";
import { useForm } from "@/components";
import { useDataClient } from "@/hooks/useDataClient";
import { ACCESS_TOKEN_KEY, PROJECT_ID_KEY } from "@/lib/constants";
import { invalidateProjectIdCache } from "@/features/projects";

export interface LoginFormValues {
    username: string;
    password: string;
    projectId: number;
}

export const useLoginForm = ({ onSuccess, ...props }: UseDataFormProps<LoginResult, LoginFormValues>) => {
    const dataClient = useDataClient();

    return useForm({
        ...props,
        onSubmit: login,
        defaultValues: { username: "", password: "", projectId: "" },
        resetValues: false,
        shouldUseNativeValidation: true,
        toastMessage: () => `Bienvenido!`,
        onSuccess: (data) => {
            localStorage.setItem(ACCESS_TOKEN_KEY, data.token)
            invalidateProjectIdCache();
            localStorage.setItem(PROJECT_ID_KEY, data.projectId.toString());
            dataClient.clear();
            onSuccess?.(data);
        },
    });
};

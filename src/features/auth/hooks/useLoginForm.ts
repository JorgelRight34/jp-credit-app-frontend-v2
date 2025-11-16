import { useAuth } from "@/contexts/AuthContext";
import { loginFormProvider, LoginFormValues } from "../lib/form";
import { toastService } from "@/services";
import { useRouter } from "@/hooks/useRouter";
import { LoginForm } from "../models/loginForm";
import { UseEntityFormReturn } from "@/components";

export const useLoginForm = (): UseEntityFormReturn<
    LoginForm,
    LoginFormValues
> => {
    const router = useRouter();
    const { login } = useAuth();

    const handleOnSubmit = async (data: LoginFormValues) => {
        const response = await login(data);

        toastService.success(`Bienvenido ${response.user.firstName}!`);

        router.push("/");

        return data;
    };

    return {
        onSubmit: handleOnSubmit,
        config: {
            formProvider: loginFormProvider,
            cacheKeysToInvalidate: [],
        },
    };
};

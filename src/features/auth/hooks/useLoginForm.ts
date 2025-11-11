import { useAuth } from "@/contexts/AuthContext";
import { LoginForm, UseEntityFormReturn } from "@/models";
import { loginFormProvider, LoginFormValues } from "../lib/form";
import { toastService } from "@/services";
import { useRouter } from "@/hooks/useRouter";

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
    };

    return {
        onSubmit: handleOnSubmit,
        config: {
            formProvider: loginFormProvider,
            cacheKeysToInvalidate: [],
        },
    };
};

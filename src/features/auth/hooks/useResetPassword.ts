import { resetPassword } from "../services/userClient";
import type { UseDataFormProps } from "@/components";
import { useForm } from "@/components";
import { User } from "../models/user";
import { resetPasswordSchema, ResetPassworFormValues } from "../lib/schemas/resetPasswordSchema";

interface UseChangeUserPasswordFormProps extends UseDataFormProps<null, ResetPassworFormValues> {
  user: User
};

export const useResetPasswordForm = ({ user, ...props }: UseChangeUserPasswordFormProps) => {
  return useForm({
    resetValues: true,
    schema: resetPasswordSchema,
    defaultValues: { id: user.id, password: "", confirmation: "" },
    onSubmit: (data) => resetPassword(user.id, data),
    toastMessage: () => "Contraseña cambiada.",
    ...props
  });
};


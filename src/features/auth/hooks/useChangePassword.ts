import { changePassword } from "../services/userClient";
import { changePasswordSchema } from "../lib/schemas/changePasswordSchema";
import type { UseFormBuilderReturn } from "@/components";
import type { User } from "../models/user";
import type { ChangePasswordSchemaType } from "../lib/schemas/changePasswordSchema";
import { useForm } from "@/components";

interface UseChangeUserPasswordFormProps {
  user: User;
}

export const useChangePasswordForm = ({
  user,
}: UseChangeUserPasswordFormProps): UseFormBuilderReturn<
  ChangePasswordSchemaType
> => {
  return useForm({
    resetValues: true,
    schema: changePasswordSchema,
    onSubmit: (data) => changePassword(data, user.username),
    toastMessage: () => "Contraseña cambiada."
  });
};


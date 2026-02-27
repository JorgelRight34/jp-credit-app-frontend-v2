import { changePassword } from "../services/userClient";
import { changePasswordSchema } from "../lib/schemas/changePasswordSchema";
import type { UseDataFormProps } from "@/components";
import type { ChangePasswordSchemaType } from "../lib/schemas/changePasswordSchema";
import { useForm } from "@/components";

type UseChangeUserPasswordFormProps = UseDataFormProps<null, ChangePasswordSchemaType>;

export const useChangePasswordForm = ({
  initialValues, ...props
}: UseChangeUserPasswordFormProps) => {
  if (!initialValues?.id) throw new Error("Must provide initial values.");

  return useForm({
    resetValues: true,
    schema: changePasswordSchema,
    defaultValues: { id: initialValues.id, password: "", confirmation: "" },
    onSubmit: (data) => changePassword(data.id, data),
    toastMessage: () => "Contraseña cambiada.",
    ...props
  });
};


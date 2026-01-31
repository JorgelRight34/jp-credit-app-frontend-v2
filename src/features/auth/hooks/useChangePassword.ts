import { changePassword } from "../services/userClient";
import { changePasswordSchema } from "../lib/schemas/changePasswordSchema";
import type { UseDataFormProps, UseFormBuilderReturn } from "@/components";
import type { ChangePasswordSchemaType } from "../lib/schemas/changePasswordSchema";
import { useForm } from "@/components";

type UseChangeUserPasswordFormProps = UseDataFormProps<null, ChangePasswordSchemaType>;

export const useChangePasswordForm = ({
  initialValues
}: UseChangeUserPasswordFormProps): UseFormBuilderReturn<
  ChangePasswordSchemaType
> => {
  if (!initialValues?.username) throw new Error("Must provide initial values.");

  return useForm({
    resetValues: true,
    schema: changePasswordSchema,
    defaultValues: { username: initialValues.username, password: "", confirmation: "" },
    onSubmit: (data) => changePassword(data.username, data),
    toastMessage: () => "Contraseña cambiada."
  });
};


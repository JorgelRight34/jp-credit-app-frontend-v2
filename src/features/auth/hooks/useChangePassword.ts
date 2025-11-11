import { UseEntityFormReturn } from "../../../components/EntityForm/models/useEntityFormReturn";
import { toastService } from "@/services";
import { User } from "../models/user";
import { changePasswordFormProvider, ChangeUserPasswordValues } from "../lib/form";
import { changePassword } from "../services/userService";

interface UseChangeUserPasswordFormProps {
  user: User;
}

export const useChangePasswordForm = ({
  user,
}: UseChangeUserPasswordFormProps): UseEntityFormReturn<
  User,
  ChangeUserPasswordValues
> => {
  const handleOnSubmit = async (data: ChangeUserPasswordValues) => {
    const response = await changePassword(data, user.username);
    toastService.success("Contraseña cambiada.");

    return response;
  };

  return {
    onSubmit: handleOnSubmit,
    config: {
      formProvider: changePasswordFormProvider,
      resetValues: true,
      cacheKeysToInvalidate: []
    },
  };
};


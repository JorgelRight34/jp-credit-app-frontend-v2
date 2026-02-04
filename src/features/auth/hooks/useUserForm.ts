import { createUser, editUser } from "../services/userClient";
import { userFormSchema } from "../lib/schemas/userFormSchema";
import type { UserFormValues } from "../lib/schemas/userFormSchema";
import type { User } from "../models/user";
import type { UseDataFormProps, UseFormBuilderReturn } from "@/components";
import { useForm } from "@/components";

export type UseUserFormProps = UseDataFormProps<User, UserFormValues> & {
  user?: User;
};

export const useUserForm = ({ user, initialValues, ...props }: UseUserFormProps): UseFormBuilderReturn<UserFormValues> => {
  return useForm({
    schema: userFormSchema,
    defaultValues: {
      username: user?.username ?? "",
      password: "",
      confirmation: "",
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      isActive: user?.isActive ?? true,
      ...initialValues
    },
    onSubmit: createUser,
    onEdit: async (data) => {
      await editUser(data, user!.id)
      return user!;
    },
    toastMessage: () => "Ha sido agregado exitosamente",
    ...props
  });
}
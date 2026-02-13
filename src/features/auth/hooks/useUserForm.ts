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
    defaultValues: user ? {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isActive: user.isActive,
    } : {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmation: "",
      isActive: true
    },
    onSubmit: createUser,
    onEdit: async (data) => {
      await editUser(data, user!.id)
    },
    toastMessage: () => "Ha sido agregado exitosamente",
    ...props
  });
}
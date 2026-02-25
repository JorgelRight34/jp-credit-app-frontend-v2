import { createUser, editUser } from "../services/userClient";
import { userFormSchema } from "../lib/schemas/userFormSchema";
import type { UserFormValues } from "../lib/schemas/userFormSchema";
import type { User } from "../models/user";
import type { UseDataFormProps, UseFormBuilderReturn } from "@/components";
import { useForm } from "@/components";

export type UseUserFormProps = UseDataFormProps<User, UserFormValues> & {
  userId?: number;
};

export const useUserForm = ({ userId, initialValues, ...props }: UseUserFormProps): UseFormBuilderReturn<UserFormValues> => {
  return useForm({
    schema: userFormSchema,
    defaultValues: initialValues ?? {
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
      await editUser(data, userId!)
    },
    ...props
  });
}
import { createUser, editUser } from "../services/userClient";
import { userFormSchema } from "../lib/schemas/userFormSchema";
import type { UserFormValues } from "../lib/schemas/userFormSchema";
import type { User } from "../../../models/user";
import type { UseDataFormProps } from "@/components";
import { useForm } from "@/components";

export type UseUserFormProps = UseDataFormProps<User, UserFormValues> & {
  userId?: number;
};

export const useUserForm = ({ userId, initialValues, ...props }: UseUserFormProps) => {
  return useForm({
    schema: userFormSchema,
    defaultValues: initialValues,
    onSubmit: createUser,
    onEdit: async (data) => {
      await editUser(data, userId!)
    },
    ...props
  });
}
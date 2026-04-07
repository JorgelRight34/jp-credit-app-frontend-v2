import { editUser } from "../services/userClient";
import { userEditFormSchema } from "../lib/schemas/userFormSchema";
import type { UserFormValues } from "../lib/schemas/userFormSchema";
import type { User } from "../../../models/user";
import type { UseDataFormProps } from "@/components";
import { useForm } from "@/components";
import { usersQueryKey } from "../lib/constants";

export type UseUserFormProps = UseDataFormProps<void, UserFormValues> & {
    user: User
};

export const useEditUserForm = ({ user, ...props }: UseUserFormProps) => {
    return useForm({
        schema: userEditFormSchema,
        defaultValues: {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isActive: user.isActive,
        },
        onSubmit: async (data) => {
            await editUser(data, user.id!)
        },
        resetValues: false,
        keysToInvalidate: [[usersQueryKey]],
        ...props
    });
}
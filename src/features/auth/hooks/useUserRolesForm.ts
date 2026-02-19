import { userRolesFormSchema } from "../lib/schemas/userRolesFormSchema";
import { updateUserRoles } from "../services/userClient";
import { usersQueryKey } from "../lib/constants";
import type { User } from "../models/user";
import type { UseDataFormProps } from "@/components";
import type { UserRolesFormValues } from "../lib/schemas/userRolesFormSchema";
import { useForm } from "@/components";

type UseUserRolesFormProps = UseDataFormProps<null, UserRolesFormValues> & {
    user?: User
};

export const useUserRolesForm = ({ user, initialValues, ...props }: UseUserRolesFormProps) => {
    return useForm<any, UserRolesFormValues>({
        schema: userRolesFormSchema,
        defaultValues: user ? {
            userId: user.id,
            roles: user.roles.map(r => r.normalizedName),
            userRoles: user.roles,
            username: user.username
        } : { roles: [], userRoles: [] },
        onSubmit: async ({ roles, userRoles, userId }) => {
            const add = roles.filter(r => !userRoles.some(ur => ur.normalizedName === r))
            const remove = userRoles.filter(ur => !roles.includes(ur.normalizedName)).map(r => r.normalizedName)

            await updateUserRoles(userId, { add, remove })
            return null;
        },
        resetValues: !!user,
        keysToInvalidate: [[usersQueryKey]],
        ...props
    })
}
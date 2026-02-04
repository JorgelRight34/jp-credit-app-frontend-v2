import { useMemo } from "react";
import { userRolesFormSchema } from "../lib/schemas/userRolesFormSchema";
import { updateUserRoles } from "../services/userClient";
import { rolesQueryKey } from "../lib/constants";
import { getRoles } from "../services/authService";
import { getRoleString } from "../lib/utils";
import { createUserQueryKey } from "../lib/query-keys";
import type { TransferItem, UseDataFormProps } from "@/components";
import type { UserRolesFormValues } from "../lib/schemas/userRolesFormSchema";
import type { Role } from "../models/role";
import { useForm } from "@/components";
import { useSuspenseData } from "@/hooks/useData";

type UseUserRolesFormProps = UseDataFormProps<null, UserRolesFormValues> & {
    userId: number;
    username: string;
    userRoles: Array<Role>
}

export const useUserRolesForm = ({ userId, username, userRoles, ...props }: UseUserRolesFormProps) => {
    const { data } = useSuspenseData({
        key: [rolesQueryKey, "form-list-options"],
        loader: () => getRoles({ all: true })
    });

    const form = useForm<any, UserRolesFormValues>({
        schema: userRolesFormSchema,
        defaultValues: { roles: userRoles.map((r) => r.normalizedName) },
        onSubmit: async ({ roles }) => {
            const add = roles.filter(r => !userRoles.some(ur => ur.normalizedName === r))
            const remove = userRoles.filter(ur => !roles.includes(ur.normalizedName)).map(r => r.normalizedName)

            await updateUserRoles(userId, { add, remove })
            return null;
        },
        resetValues: false,
        keysToInvalidate: [createUserQueryKey(username)],
        ...props
    })

    const rolesListClaims = useMemo<Array<TransferItem>>(() => (
        data.items.map(item => ({ id: item.normalizedName, label: getRoleString(item) }))
    ), [data])

    return { form, rolesListClaims }
}
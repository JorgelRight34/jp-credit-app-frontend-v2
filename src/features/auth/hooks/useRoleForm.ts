import { roleFormSchema } from "../lib/schemas/roleFormSchema";
import { createRole, updateRole } from "../services/authService";
import { rolesQueryKey } from "../lib/constants";
import type { RoleFormSchemaValues } from "../lib/schemas/roleFormSchema";
import type { Role } from "../models/role";
import type { UseDataFormProps } from "@/components";
import { useForm } from "@/components";

type UseRoleFormProps = UseDataFormProps<Role, RoleFormSchemaValues> & {
    roleId?: number;
};

export const useRoleForm = ({ defaultValues, roleId, shouldEdit, ...config }: UseRoleFormProps) => {
    return useForm({
        schema: roleFormSchema,
        defaultValues: defaultValues ?? { name: "" },
        onSubmit: createRole,
        onEdit: (data) => updateRole(roleId!, data),
        keysToInvalidate: [[rolesQueryKey]],
        ...config
    })
}
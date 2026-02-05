import { roleFormSchema } from "../lib/schemas/roleFormSchema";
import { createRole, updateRole } from "../services/authService";
import { rolesQueryKey } from "../lib/constants";
import type { RoleFormSchemaValues } from "../lib/schemas/roleFormSchema";
import type { Role } from "../models/role";
import type { UseDataFormProps } from "@/components";
import { useForm } from "@/components";

type UseRoleFormProps = UseDataFormProps<Role, RoleFormSchemaValues> & {
    role?: Role;
};

export const useRoleForm = ({ initialValues, role, shouldEdit, ...config }: UseRoleFormProps) => {
    return useForm({
        schema: roleFormSchema,
        defaultValues: { name: role?.name ?? "" },
        onSubmit: createRole,
        onEdit: (data) => updateRole(role!.id, data),
        shouldEdit: !!role,
        keysToInvalidate: [[rolesQueryKey]],
        toastMessage: (data) => shouldEdit ? `Se ha modificado el rol ${role?.name}` : `Se ha creado el rol (${data!.id}) [${data!.name}]`,
        ...config
    })
}
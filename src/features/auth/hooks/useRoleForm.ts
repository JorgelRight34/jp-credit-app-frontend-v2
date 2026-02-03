import { roleFormSchema } from "../lib/schemas/roleFormSchema";
import { createRole } from "../services/authService";
import { rolesQueryKey } from "../lib/constants";
import type { RoleFormSchemaValues } from "../lib/schemas/roleFormSchema";
import type { Role } from "../models/role";
import type { UseDataFormProps } from "@/components";
import { useForm } from "@/components";

export const useRoleForm = ({ initialValues, ...config }: UseDataFormProps<Role, RoleFormSchemaValues>) => {
    return useForm({
        schema: roleFormSchema,
        defaultValues: { name: initialValues?.name ?? "" },
        onSubmit: createRole,
        onEdit: () => { throw new Error("not implemented") },
        keysToInvalidate: [[rolesQueryKey]],
        ...config
    })
}
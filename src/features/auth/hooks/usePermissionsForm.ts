import { permissionsFormSchema } from "../lib/schemas/permissionsFormSchema";
import { updateUserClaims } from "../services/authService";
import { getClaimPairsFromStringArray } from "../lib/utils";
import type { UseDataFormProps, UseFormBuilderReturn } from "@/components";
import type { PermissionsFormValues } from "../lib/schemas/permissionsFormSchema";
import { useForm } from "@/components";

export type UsePermissionsFormProps = UseDataFormProps<
  null,
  PermissionsFormValues
>

export const usePermissionsForm = ({ initialValues, ...config }: UsePermissionsFormProps):
  UseFormBuilderReturn<PermissionsFormValues> => {
  return useForm({
    schema: permissionsFormSchema,
    onSubmit: async ({ id, claims }) => {
      await updateUserClaims(id, {
        add: getClaimPairsFromStringArray(claims),
        remove: []
      });
      return null;
    },
    onEdit: async ({ id, claims }) => {
      const removedClaims = initialValues?.claims?.filter(c => !claims.includes(c));
      const claimsToAdd = claims.filter(c => !initialValues?.claims?.includes(c));
      await updateUserClaims(id, {
        add: getClaimPairsFromStringArray(claimsToAdd),
        remove: removedClaims ? getClaimPairsFromStringArray(removedClaims) : []
      })

      return null;
    },
    defaultValues: { claims: [], roles: [], ...initialValues },
    ...config
  })
}
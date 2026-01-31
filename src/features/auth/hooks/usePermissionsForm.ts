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
    onSubmit: async ({ username, claims }) => {
      await updateUserClaims(username, {
        add: getClaimPairsFromStringArray(claims),
        remove: []
      });
      return null;
    },
    onEdit: async ({ username, claims }) => {
      const removedClaims = initialValues?.claims?.filter(c => !claims.includes(c));
      await updateUserClaims(username, {
        add: getClaimPairsFromStringArray(claims),
        remove: removedClaims ? getClaimPairsFromStringArray(removedClaims) : []
      })

      return null;
    },
    defaultValues: initialValues,
    ...config
  })
}
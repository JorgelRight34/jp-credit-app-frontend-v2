import { permissionsFormSchema } from "../lib/schemas/permissionsFormSchema";
import { getPermissionClaimPairsFromStringArray } from "../lib/utils";
import type { ClaimPair } from "../models/claimPair";
import type { FormRef, UseDataFormProps } from "@/components";
import type { PermissionsFormValues } from "../lib/schemas/permissionsFormSchema";
import { useForm } from "@/components";

export type UpdatePermissionsHandler = (id: number, body: { add: Array<ClaimPair>; remove: Array<ClaimPair> }) => Promise<unknown>

export type UsePermissionsFormProps = UseDataFormProps<
  null,
  PermissionsFormValues
> & {
  handler: UpdatePermissionsHandler
}

export type PermissionsFormRef = FormRef<PermissionsFormValues>;

export const usePermissionsForm = ({ defaultValues, handler, ...config }: UsePermissionsFormProps) => {
  return useForm<any, PermissionsFormValues>({
    schema: permissionsFormSchema,
    onSubmit: async ({ id, claims }) => {
      await handler(id, {
        add: getPermissionClaimPairsFromStringArray(claims),
        remove: []
      });
      return null;
    },
    onEdit: async ({ id, claims }) => {
      const initialValuesClaims = defaultValues?.claims as Array<string> | undefined;
      const removedClaims = initialValuesClaims?.filter(c => !claims.includes(c));
      const claimsToAdd = claims.filter(c => !defaultValues?.claims?.includes(c));

      await handler(id, {
        add: getPermissionClaimPairsFromStringArray(claimsToAdd),
        remove: removedClaims ? getPermissionClaimPairsFromStringArray(removedClaims) : []
      })

      return;
    },
    defaultValues: { claims: [], roles: [], ...defaultValues },
    ...config
  })

}
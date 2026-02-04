import { useMemo } from "react";
import { permissionsFormSchema } from "../lib/schemas/permissionsFormSchema";
import { getClaimPairsFromStringArray } from "../lib/utils";
import { getAllPossibleClaims } from "../services/authService";
import type { ClaimPair } from "../models/claimPair";
import type { TransferItem, UseDataFormProps } from "@/components";
import type { PermissionsFormValues } from "../lib/schemas/permissionsFormSchema";
import { useForm } from "@/components";
import { useSuspenseData } from "@/hooks/useData";

export type UpdatePermissionsHandler = (id: number, body: { add: Array<ClaimPair>; remove: Array<ClaimPair> }) => Promise<unknown>

export type UsePermissionsFormProps = UseDataFormProps<
  null,
  PermissionsFormValues
> & {
  handler: UpdatePermissionsHandler
}

export const usePermissionsForm = ({ initialValues, handler, ...config }: UsePermissionsFormProps) => {
  const { data: identityClaims } = useSuspenseData({
    key: ['identity-claims'],
    loader: getAllPossibleClaims,
  })

  const form = useForm<any, PermissionsFormValues>({
    schema: permissionsFormSchema,
    onSubmit: async ({ id, claims }) => {
      await handler(id, {
        add: getClaimPairsFromStringArray(claims),
        remove: []
      });
      return null;
    },
    onEdit: async ({ id, claims }) => {
      const removedClaims = initialValues?.claims?.filter(c => !claims.includes(c));
      const claimsToAdd = claims.filter(c => !initialValues?.claims?.includes(c));

      await handler(id, {
        add: getClaimPairsFromStringArray(claimsToAdd),
        remove: removedClaims ? getClaimPairsFromStringArray(removedClaims) : []
      })

      return null;
    },
    defaultValues: { claims: [], roles: [], ...initialValues },
    ...config
  })

  const claimListOptions = useMemo<Array<TransferItem>>(() => {
    return Object.entries(identityClaims.claims).flatMap(([type, values]) =>
      values.map(({ value, description }) => ({
        label: `${type} | ${value} | ${description}`,
        id: value,
      })),
    )
  }, [identityClaims.claims])

  return { form, claimListOptions }
}
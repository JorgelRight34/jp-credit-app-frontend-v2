/*
import { useCallback, useMemo } from "react";
import { User } from "../models/user";
import { useAddProfilePermissions } from "./useAddProfilePermissions";
import usePossiblePermissions from "./usePossiblePermissions";
import useUserPermissions from "./useUserPermissions";
import { UseEntityFormReturn } from "@/components";
import { ModulePermission } from "../models/modulePermission";
import { FieldValues } from "react-hook-form";

interface UsePermissionsFormProps {
  profile?: User;
}

const usePermissionsForm = ({ profile }: UsePermissionsFormProps): UseEntityFormReturn<ModulePermission, FieldValues, object> => {
  const possiblePermissions = usePossiblePermissions();
  const { permissions } = useUserPermissions({ id: profile?.id });
  const { claims } = permissions;

  const { handleAddProfilePermissions } = useAddProfilePermissions({
    claims,
    username: profile?.username,
  });

  const findClaimByDomain = useCallback((
    claims: string[],
    permissionDomain: (typeof possiblePermissions.permissionDomains)[number]
  ): string | undefined => {
    return claims?.find(
      (claim) =>
        claim.split(".")[0].toLowerCase() === permissionDomain.toLowerCase()
    );
  }, [possiblePermissions]);

  const getClaimValueForDomain = useCallback((
    domain: (typeof possiblePermissions.permissionDomains)[number]
  ): string => (profile ? findClaimByDomain(claims, domain) || "" : ""),
    [claims, findClaimByDomain, possiblePermissions, profile]);


  const defaultFormValues = useMemo(() => {
    return possiblePermissions.permissionsFormProvider.fields.reduce((formDefaults, permissionField) => {
      formDefaults[permissionField.name] = getClaimValueForDomain(
        permissionField.name
      );
      return formDefaults;
    }, {} as Record<string, string | number | null | undefined>);
  }, [possiblePermissions.permissionsFormProvider.fields, getClaimValueForDomain]);


  return {
    onSubmit: handleAddProfilePermissions,
    config: {
      resetValues: false,
      formProvider: {
        schema: possiblePermissions.permissionsFormProvider.schema,
        fields: possiblePermissions.permissionsFormProvider.fields
      },
      cacheKeysToInvalidate: []
    },
    defaultValues: defaultFormValues,
  };
};

export default usePermissionsForm;
*/
export const Default = () => {
  return {}
}

export default Default
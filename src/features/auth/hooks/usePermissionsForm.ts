import { useCallback, useMemo } from "react";
import { User } from "../models/user";
import useAddProfilePermissions from "./useAddProfilePermissions";
import usePossiblePermissions from "./usePossiblePermissions";
import useUserPermissions from "./useUserPermissions";
import { UseEntityFormReturn } from "@/components";

interface UsePermissionsFormProps {
  /** The user profile for which permissions are being managed */
  profile?: User;
}

/**
 * Custom hook for managing permissions form functionality
 *
 * This hook provides form configuration and state management for user permissions.
 * It handles loading user claims, setting up form defaults, and managing form submission.
 *
 */
const usePermissionsForm = ({ profile }: UsePermissionsFormProps): UseEntityFormReturn<Permissions, object> => {
  const possiblePermissions =
    usePossiblePermissions();

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
  ): string => (profile ? findClaimByDomain(claims, domain) || "" : ""), [claims, findClaimByDomain, possiblePermissions, profile]);


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

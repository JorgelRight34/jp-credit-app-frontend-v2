import { useCallback, useMemo } from "react";
import { User } from "../models/user";
import useAddProfilePermissions from "./useAddProfilePermissions";
import usePossiblePermissions from "./usePossiblePermissions";
import useUserPermissions from "./useUserPermissions";
import { UseEntityFormReturn } from "@/models";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { permissionDomains, permissionsFormProvider } =
    usePossiblePermissions();

  const { permissions } = useUserPermissions({ id: profile?.id });
  const { claims } = permissions;

  const { handleAddProfilePermissions } = useAddProfilePermissions({
    claims,
    username: profile?.username,
  });

  const findClaimByDomain = useCallback((
    claims: string[],
    permissionDomain: (typeof permissionDomains)[number]
  ): string | undefined => {
    return claims?.find(
      (claim) =>
        claim.split(".")[0].toLowerCase() === permissionDomain.toLowerCase()
    );
  }, []);

  const getClaimValueForDomain = useCallback((
    domain: (typeof permissionDomains)[number]
  ): string => (profile ? findClaimByDomain(claims, domain) || "" : ""), [claims, findClaimByDomain, profile]);


  const defaultFormValues = useMemo(() => {
    return permissionsFormProvider.fields.reduce((formDefaults, permissionField) => {
      formDefaults[permissionField.name] = getClaimValueForDomain(
        permissionField.name
      );
      return formDefaults;
    }, {} as Record<string, string | number | null | undefined>);
  }, [permissionsFormProvider.fields, getClaimValueForDomain]);


  return {
    onSubmit: handleAddProfilePermissions,
    config: {
      resetValues: false,
      formProvider: {
        schema: permissionsFormProvider.schema,
        fields: permissionsFormProvider.fields
      },
      cacheKeysToInvalidate: []
    },
    defaultValues: defaultFormValues,
  };
};

export default usePermissionsForm;

import { useQuery } from "@tanstack/react-query";
import { permissionsQueryKey } from "../lib/constants";
import { getPermissions } from "../services/userClient";

interface UseUserPermissionsProps {
  id?: number;
}

const useUserPermissions = ({ id }: UseUserPermissionsProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [permissionsQueryKey, "claims", id],
    queryFn: () => getPermissions(id!),
    enabled: !!id,
  });

  return {
    permissions: data || {
      roles: [],
      claims: [],
    },
    isLoading,
    isError,
  };
};

export default useUserPermissions;

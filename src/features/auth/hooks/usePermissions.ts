import { CacheKey } from "@/models";
import { useData } from "@/hooks/useData";
import { ModulePermissions } from "../models/modulePermissions";
import { permissionsQueryKey } from "../lib/constants";

interface UsePermissionsProps {
  cacheKey?: CacheKey;
  getPermissions?: () => Promise<ModulePermissions>;
}

export const usePermissions = ({ cacheKey, getPermissions }: UsePermissionsProps) => {
  const { data, isLoading, isError } = useData<ModulePermissions>({
    key: [...permissionsQueryKey, ...(cacheKey ?? [])],
    getData: getPermissions,
    enabled: !!getPermissions || !!cacheKey
  })

  return { permissions: data, isLoading, isError }
};

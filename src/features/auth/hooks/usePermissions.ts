import { ModulePermissions } from "../models/modulePermissions";
import { CacheKey } from "@/models";
import { useData } from "@/hooks/useData";

interface UsePermissionsProps {
  getPermissions?: () => Promise<ModulePermissions>;
  cacheKey?: CacheKey;
}

const usePermissions = ({
  getPermissions,
  cacheKey
}: UsePermissionsProps) => {
  const { data, isLoading, isError } = useData<ModulePermissions>({
    key: ["permissions", ...(cacheKey ?? [])],
    getData: getPermissions,
    enabled: !!getPermissions || !!cacheKey
  })

  return { permissions: data, isLoading, isError }
};

export default usePermissions;

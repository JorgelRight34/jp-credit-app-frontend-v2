import { NO_PERMISSION } from "../lib/form";
import { profilesQueryKey } from "../../Profiles/lib/constants";
import { editPermission } from "../services/userService";
import { toastService } from "@/services";
import { useDataClient } from "@/hooks/useDataClient";

interface UseAddProfilePermissionsProps {
  claims?: string[];
  username?: string;
}

const useAddProfilePermissions = ({
  claims = [],
  username,
}: UseAddProfilePermissionsProps) => {
  const dataClient = useDataClient()

  const handleAddProfilePermissions = async (data: object) => {
    if (!username) return;

    const claimsToAdd = Object.values(data).filter(
      (d) => d !== "" && d !== NO_PERMISSION
    );

    const payload = {
      claimsToAdd,
      claimsToRemove: [
        // Remove claims from the current profile that:
        // 1. Are NOT included in the new claims to add
        ...(claims.filter((value) => !claimsToAdd.includes(value)) || []),

        // Additionally, remove claims where:
        // 1. The main domain matches a claim being added
        // 2. But the subdomain is explicitly marked as "NO_PERMISSION"
        ...(claims.filter(
          (value) =>
            claimsToAdd.includes(value) && value.split(".")[1] === NO_PERMISSION
        ) || []),
      ],
    };

    await editPermission(payload, username);

    dataClient.invalidateQueries({
      queryKey: [profilesQueryKey],
    });

    toastService.success("Permisos actualizados!");
  };

  return { handleAddProfilePermissions };
};

export default useAddProfilePermissions;

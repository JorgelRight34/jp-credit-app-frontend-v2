
"use client"

import { editPermission } from "../services/userClient";
import { toastService } from "@/lib/services";
import { useDataClient } from "@/hooks/useDataClient";
import { NO_PERMISSION } from "../lib/form";
import { profilesQueryKey } from "@/features/profiles";
import { FieldValues } from "react-hook-form";

interface UseAddProfilePermissionsProps {
  claims?: string[];
  username?: string;
}

export const useAddProfilePermissions = ({ claims = [], username }: UseAddProfilePermissionsProps) => {
  const dataClient = useDataClient()

  const handleAddProfilePermissions = async (data: FieldValues) => {
    if (!username) return data;

    const claimsToAdd = Object.values(data).filter(
      (d) => d !== "" && d !== NO_PERMISSION
    );

    await editPermission({
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
    }, username);

    dataClient.invalidate({ key: [...profilesQueryKey], });

    toastService.success("Permisos actualizados!");

    return data;
  };

  return { handleAddProfilePermissions };
};

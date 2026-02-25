import { PermissionsProvider } from "@/components";
import { adjustmentNoteQueryKey } from "../query-keys";
import { getModulePermissions } from "@/features/auth";

export const adjustmentNotesPermissionProvider: PermissionsProvider = {
    cacheKey: [adjustmentNoteQueryKey],
    loader: () => getModulePermissions("adjustment-notes/permissions")
}
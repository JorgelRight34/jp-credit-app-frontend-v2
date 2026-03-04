import { PermissionsProvider } from "@/components";
import { reportsBreadcrumb } from "../pages/reports-page";
import { getModulePermissions } from "@/features/auth";

export const reportPermissionProvider: PermissionsProvider = {
    cacheKey: [reportsBreadcrumb],
    loader: () => getModulePermissions("reports/permissions")
}
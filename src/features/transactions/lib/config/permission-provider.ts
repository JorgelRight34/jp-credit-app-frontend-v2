import { PermissionsProvider } from "@/components";
import { transactionsQueryKey } from "../constants";
import { getModulePermissions } from "@/features/auth";

export const transactionPermissionProvider: PermissionsProvider = {
    cacheKey: [transactionsQueryKey],
    loader: () => getModulePermissions("transactions/permissions")
}


export const transactionReportPermissionProvider = transactionPermissionProvider
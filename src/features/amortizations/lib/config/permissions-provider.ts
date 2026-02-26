import { PermissionsProvider } from "@/components";
import { amortizationQueryKey } from "../constants";

export const amortizationPermissionsProvider: PermissionsProvider = {
    cacheKey: [amortizationQueryKey],
    loader: async () => ({ canCreate: true, canDelete: true, canEdit: true, canView: true })
}
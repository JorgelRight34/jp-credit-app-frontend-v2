import { PermissionsProvider } from '@/components'
import { getModulePermissions } from '@/features/auth'
import { loansQueryKey } from '../query-keys'

export const loanPermissionProvider: PermissionsProvider = {
  cacheKey: [loansQueryKey],
  loader: () => getModulePermissions('loans/permissions'),
}

export const loanReportPermissionProvider = loanPermissionProvider

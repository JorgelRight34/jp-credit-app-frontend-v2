import { PermissionsProvider } from '@/components'
import { loansQueryKey } from '../constants'
import { getModulePermissions } from '@/features/auth'

export const loanPermissionProvider: PermissionsProvider = {
  cacheKey: [loansQueryKey],
  loader: () => getModulePermissions('loans/permissions'),
}

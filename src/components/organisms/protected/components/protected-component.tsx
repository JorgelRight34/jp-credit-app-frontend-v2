import { createPermissionQueryKey } from '../lib/query-keys'
import type { PermissionsProvider } from '../models/permissionsProvider'
import type { ModulePermissions } from '../models/modulePermissions'
import type { ReactNode } from 'react'
import { useSuspenseData } from '@/hooks/useData'

export interface ProtectedComponentProps {
  provider: PermissionsProvider
  fetchedPermissions?: ModulePermissions
  children: ReactNode
  fallback?: ReactNode
  isAuthorizedFn: (permissions: ModulePermissions) => boolean
}

const ProtectedComponent = ({
  provider,
  children,
  fetchedPermissions,
  fallback = null,
  isAuthorizedFn,
}: ProtectedComponentProps) => {
  const { data: permissions } = useSuspenseData({
    key: createPermissionQueryKey(provider),
    loader: provider.loader,
    initialData: fetchedPermissions,
  })

  if (!isAuthorizedFn(permissions)) return fallback

  return children
}

export default ProtectedComponent

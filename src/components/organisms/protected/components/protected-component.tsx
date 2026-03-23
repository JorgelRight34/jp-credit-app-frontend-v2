import { createPermissionQueryKey } from '../lib/query-keys'
import type { PermissionsProvider } from '../models/permissionsProvider'
import type { ModulePermissions } from '../models/modulePermissions'
import type { ElementType, ReactNode } from 'react'
import { useSuspenseData } from '@/hooks/useData'
import { Unathorized } from '@/components/molecules'

export interface ProtectedComponentProps {
  provider: PermissionsProvider
  fetchedPermissions?: ModulePermissions
  children: ReactNode
  fallback?: ElementType
  isAuthorizedFn: (permissions: ModulePermissions) => boolean
}

const ProtectedComponent = ({
  provider,
  children,
  fetchedPermissions,
  fallback: Fallback = Unathorized,
  isAuthorizedFn,
}: ProtectedComponentProps) => {
  const { data: permissions } = useSuspenseData({
    key: createPermissionQueryKey(provider),
    loader: provider.loader,
    initialData: fetchedPermissions,
  })

  if (!isAuthorizedFn(permissions)) return <Fallback />

  return children
}

export default ProtectedComponent

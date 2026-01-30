import type { ReactNode } from 'react'
import type { ModulePermissions } from '../../models/modulePermissions'
import type { PermissionsProvider } from '@/models/permissionsProvider'
import Unauthorized from '@/components/molecules/pages/unathorized'
import { useSuspenseData } from '@/hooks/useData'

export interface PermissionsProviderWrapperProps {
  provider: PermissionsProvider
  fetchedPermissions?: ModulePermissions
  children: ReactNode
  isAuthorizedFn: (permissions: ModulePermissions) => boolean
}

const PermissionsProviderWrapper = ({
  provider,
  children,
  fetchedPermissions,
  isAuthorizedFn,
}: PermissionsProviderWrapperProps) => {
  const { data: permissions } = useSuspenseData({
    key: provider.cacheKey,
    loader: provider.loader,
    initialData: fetchedPermissions,
  })

  if (!isAuthorizedFn(permissions)) return <Unauthorized />

  return children
}

export default PermissionsProviderWrapper

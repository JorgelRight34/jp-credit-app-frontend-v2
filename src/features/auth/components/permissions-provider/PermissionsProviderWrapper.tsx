/*
import { PermissionsProvider } from '@/models/permissionsProvider'
import { ReactNode } from 'react'
import { ModulePermissions } from '../../models/modulePermissions'
import Unauthorized from '../unathorized'

export interface PermissionsProviderWrapperProps {
  provider?: PermissionsProvider
  fetchedPermissions?: ModulePermissions
  children: ReactNode
  cookiesToValidate?: string[]
  isAuthorizedFn: (permissions: ModulePermissions) => boolean
  onSuccess?: (
    provider: PermissionsProvider,
    permissions: ModulePermissions,
  ) => void
}

const PermissionsProviderWrapper = async ({
  provider,
  children,
  fetchedPermissions,
  isAuthorizedFn,
  onSuccess,
}: PermissionsProviderWrapperProps) => {
  const permissions = fetchedPermissions
    ? await provider?.getPermissions()
    : fetchedPermissions

  if (permissions && !isAuthorizedFn(permissions)) return <Unauthorized />
  if (permissions && onSuccess) onSuccess(provider!, permissions)

  return children
}

export default PermissionsProviderWrapper
*/
export interface PermissionsProviderWrapperProps {}

const Default = () => {
  return 'permissions'
}

export default Default

import { createPermissionQueryKey } from '../../protected'
import Tab from './tab'
import type { IsAuthorizedFn, PermissionsProvider } from '../../protected'
import type { TabProps } from './tab'
import { useData } from '@/hooks/useData'
import { Unathorized } from '@/components/molecules'

export type ProtectedTabProps = TabProps & {
  permissionProvider: PermissionsProvider
  isAuthorizedFn: IsAuthorizedFn
}

const ProtectedTabProps = ({
  permissionProvider,
  children,
  isAuthorizedFn,
  ...props
}: ProtectedTabProps) => {
  const { data, isLoading } = useData({
    key: createPermissionQueryKey(permissionProvider),
    loader: permissionProvider.loader,
  })

  return (
    <Tab {...props}>
      {isLoading ? (
        '...'
      ) : data && !isAuthorizedFn(data) ? (
        children
      ) : (
        <Unathorized />
      )}
    </Tab>
  )
}

export default ProtectedTabProps

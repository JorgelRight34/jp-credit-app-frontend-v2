import PermissionsForm from '../permissions-form/permissions-form'
import { getUserPermissions } from '../../services/userClient'
import { claimPairToString } from '../../lib/utils'
import { createUserPermissionsQueryKey } from '../../lib/query-keys'
import type { PermissionsFormProps } from '../permissions-form/permissions-form'
import type { UserPermissions } from '../../models/userPermissions'
import { useSuspenseData } from '@/hooks/useData'

interface UserFormPermissionsProps extends PermissionsFormProps {
  username?: string
  initialPermissions?: UserPermissions
}

const UserFormPermissions = ({
  username,
  initialPermissions = { claims: [], roles: [] },
  ...props
}: UserFormPermissionsProps) => {
  const { data } = useSuspenseData({
    key: createUserPermissionsQueryKey(username ?? 'null'),
    loader: () => getUserPermissions(username!),
    enabled: !!username,
    initialData: initialPermissions,
  })

  return (
    <PermissionsForm
      {...props}
      initialValues={{
        username: username,
        claims: data.claims.map(claimPairToString),
      }}
    />
  )
}

export default UserFormPermissions

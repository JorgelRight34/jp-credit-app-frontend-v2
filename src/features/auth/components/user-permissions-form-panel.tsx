import { Suspense, useMemo } from 'react'
import { claimPairToString } from '../lib/utils'
import { updateUserClaims } from '../services/userClient'
import PermissionsForm from './permissions-form'
import type { PermissionsFormProps } from './permissions-form'
import type { User } from '../models/user'

interface UserPermissionsFormPanelProps extends Partial<PermissionsFormProps> {
  user?: User
}

const UserPermissionsFormPanel = ({
  user,
  ...props
}: UserPermissionsFormPanelProps) => {
  const permissionsFormInitialValues = useMemo<PermissionsFormProps["initialValues"]>(
    () => (user ? { claims: user.claims.map(claimPairToString), id: user.id, roles: [] } : undefined),
    [user],
  )

  return (
    <Suspense fallback="...">
      <PermissionsForm
        handler={updateUserClaims}
        initialValues={permissionsFormInitialValues}
        {...props}
      />
    </Suspense>
  )
}

export default UserPermissionsFormPanel

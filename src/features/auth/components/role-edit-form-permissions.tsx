import { useState } from 'react'
import { claimPairToString } from '../lib/utils'
import { updateRoleClaims } from '../services/authService'
import PermissionsForm from './permissions-form'
import type { Role } from '../models/role'
import type { PermissionsFormProps } from './permissions-form'
import type { IdentityPermissions } from '../models/identityPermissions'
import { FormContainer, FormContainerButtons } from '@/components'

interface RoleEditFormPermissionsProps extends Omit<
  PermissionsFormProps,
  'handler'
> {
  roleId: Role['id']
  rolePermissions: IdentityPermissions
}

const RoleEditFormPermissions = ({
  roleId,
  rolePermissions,
  ...props
}: RoleEditFormPermissionsProps) => {
  const [isDirty, setIsDirty] = useState(false)

  return (
    <FormContainer footer={<FormContainerButtons isDirty={isDirty} />}>
      <PermissionsForm
        {...props}
        handler={updateRoleClaims}
        shouldEdit={true}
        initialValues={{
          id: roleId,
          claims: rolePermissions.claims.map(claimPairToString),
        }}
        onDirtyChange={setIsDirty}
      />
    </FormContainer>
  )
}

export default RoleEditFormPermissions

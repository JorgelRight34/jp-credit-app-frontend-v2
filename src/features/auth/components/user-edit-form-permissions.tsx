import { useState } from 'react'
import { updateUserClaims } from '../services/userClient'
import { claimPairToString } from '../lib/utils'
import PermissionsForm from './permissions-form'
import type { ClaimPair } from '../models/claimPair'
import type { PermissionsFormProps } from './permissions-form'
import type { User } from '../models/user'
import { FormContainer, FormSubmitBtn } from '@/components'

interface UserEditFormPermissionsProps extends Omit<
  PermissionsFormProps,
  'handler'
> {
  userId: User['id']
  claims: Array<ClaimPair>
}

const UserEditFormPermissions = ({
  userId,
  claims,
  ...props
}: UserEditFormPermissionsProps) => {
  const [isDirty, setIsDirty] = useState(false)

  return (
    <FormContainer footer={<FormSubmitBtn isDirty={isDirty} />}>
      <PermissionsForm
        {...props}
        handler={updateUserClaims}
        shouldEdit={true}
        initialValues={{
          id: userId,
          claims: claims.map(claimPairToString),
        }}
        onDirtyChange={setIsDirty}
      />
    </FormContainer>
  )
}

export default UserEditFormPermissions

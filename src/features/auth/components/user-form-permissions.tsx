import { useRef, useState } from 'react'
import { getUserPermissions } from '../services/userClient'
import { claimPairToString } from '../lib/utils'
import { createUserPermissionsQueryKey } from '../lib/query-keys'
import PermissionsForm from './permissions-form'
import type { PermissionsFormProps } from './permissions-form'
import type { UserPermissions } from '../models/userPermissions'
import type { User } from '../models/user'
import type { FormRef } from '@/components'
import { useSuspenseData } from '@/hooks/useData'
import { FormContainer, FormSubmitBtn } from '@/components'

interface UserFormPermissionsProps extends PermissionsFormProps {
  userId: User['id']
  username: string
  userPermissions: UserPermissions
}

const UserFormPermissions = ({
  username,
  userId,
  userPermissions,
  ...props
}: UserFormPermissionsProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const form = useRef<FormRef>(null)
  const { data } = useSuspenseData({
    key: createUserPermissionsQueryKey(userId),
    loader: () => getUserPermissions(username),
    enabled: !!userId,
    initialData: userPermissions,
  })

  return (
    <FormContainer
      footer={
        <FormSubmitBtn
          isDirty={isDirty}
          onSubmit={() => form.current?.submit()}
        />
      }
    >
      <PermissionsForm
        {...props}
        ref={form}
        shouldEdit={true}
        initialValues={{
          id: userId,
          claims: data.claims.map(claimPairToString),
        }}
        onDirtyChange={setIsDirty}
      />
    </FormContainer>
  )
}

export default UserFormPermissions

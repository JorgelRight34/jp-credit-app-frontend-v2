import { useChangePasswordForm } from '../../hooks/useChangePassword'
import type { EntityFormProps } from '@/components'
import type { User } from '../../models/user'
import type { ChangeUserPasswordValues } from '../../lib/form'
import { FormBuilder } from '@/components'

export interface ChangePasswordFormProps extends EntityFormProps<ChangeUserPasswordValues> {
  user: User
}

const ChangePasswordForm = ({ user, ...props }: ChangePasswordFormProps) => {
  const config = useChangePasswordForm({ user })

  return (
    <FormBuilder<User, ChangeUserPasswordValues>
      layout={[['password'], ['confirmation']]}
      {...config}
      {...props}
    />
  )
}

export default ChangePasswordForm

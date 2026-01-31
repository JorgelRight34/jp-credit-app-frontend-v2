import UserForm from '../components/user-form/user-form'
import { accessControlPermissionProvider } from '../lib/permissionProvider'
import type { User } from '../models/user'
import type { UserPermissions } from '../models/userPermissions'
import { FormPageLayout } from '@/components'

type UserFormPageProps = {
  user?: User
  title: string
  initialPermissions?: UserPermissions
}

const UserFormPage = ({
  title,
  user,
  initialPermissions,
}: UserFormPageProps) => {
  return (
    <FormPageLayout
      title={title}
      permissionProvider={accessControlPermissionProvider}
      options={[]}
    >
      <UserForm
        shouldEdit={!!user}
        user={user}
        initialPermissions={initialPermissions}
      />
    </FormPageLayout>
  )
}

export default UserFormPage

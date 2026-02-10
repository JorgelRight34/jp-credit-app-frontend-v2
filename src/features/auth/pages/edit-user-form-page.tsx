import UserForm from '../components/create-user-form'
import {
  accessControlBreadcrumb,
  createUserBreadcrumb,
  usersModuleBreadcrumb,
} from '../lib/config/breadcrumbs'
import { accessControlPermissionProvider } from '../lib/config/permissionProvider'
import type { User } from '../models/user'
import { FormPageLayout } from '@/components'

interface EditUserFormPageProps {
  user: User
}

const EditUserFormPage = ({ user }: EditUserFormPageProps) => {
  return (
    <FormPageLayout
      title={user.username}
      mode="edit"
      permissionProvider={accessControlPermissionProvider}
      breadcrumbs={
        [accessControlBreadcrumb, usersModuleBreadcrumb].concat(createUserBreadcrumb(user))
      }
    >
      <UserForm user={user} />
    </FormPageLayout>
  )
}

export default EditUserFormPage

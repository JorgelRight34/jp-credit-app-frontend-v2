import UserForm from '../components/user-access-form'
import {
  accessControlBreadcrumb,
  createUserBreadcrumb,
  usersModuleBreadcrumb,
} from '../lib/config/breadcrumbs'
import { accessControlPermissionProvider } from '../lib/config/permissionProvider'
import type { User } from '../models/user'
import { FormPageLayout } from '@/components'

interface UserFormPageProps {
  user?: User
}

const baseBreadcrumbs = [accessControlBreadcrumb, usersModuleBreadcrumb]

const UserFormPage = ({ user }: UserFormPageProps) => {
  return (
    <FormPageLayout
      title={user ? user.username : 'acceso'}
      mode={user ? 'edit' : 'create'}
      permissionProvider={accessControlPermissionProvider}
      breadcrumbs={
        user
          ? baseBreadcrumbs.concat(createUserBreadcrumb(user))
          : baseBreadcrumbs
      }
    >
      <UserForm user={user} />
    </FormPageLayout>
  )
}

export default UserFormPage

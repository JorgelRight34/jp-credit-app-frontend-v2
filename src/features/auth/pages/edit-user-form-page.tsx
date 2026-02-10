import EditUserAccessForm from '../components/edit-user-form'
import {
  accessControlBreadcrumb,
  createUserBreadcrumb,
  usersModuleBreadcrumb,
} from '../lib/config/breadcrumbs'
import { accessControlPermissionProvider } from '../lib/config/permissionProvider'
import type { User } from '../models/user'
import { EditFormPageLayout } from '@/components'

interface EditUserFormPageProps {
  user: User
}

const EditUserFormPage = ({ user }: EditUserFormPageProps) => {
  return (
    <EditFormPageLayout
      title={user.username}
      permissionProvider={accessControlPermissionProvider}
      breadcrumbs={[accessControlBreadcrumb, usersModuleBreadcrumb].concat(
        createUserBreadcrumb(user),
      )}
    >
      <EditUserAccessForm user={user} />
    </EditFormPageLayout>
  )
}

export default EditUserFormPage

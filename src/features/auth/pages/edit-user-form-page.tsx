import EditUserAccessForm from '../components/edit-user-form'
import { accessControlPermissionProvider } from '../lib/config/permissionProvider'
import type { PropsWithUser } from '../../../models/user'
import { EditFormPageLayout } from '@/components'
import { accessControlBreadcrumb } from './access-control-page'
import { buildUserBreadcrumb, usersModuleBreadcrumb } from './user-page'

const EditUserFormPage = ({ user }: PropsWithUser) => {
  return (
    <EditFormPageLayout
      title={user.username}
      permissionProvider={accessControlPermissionProvider}
      breadcrumbs={[
        accessControlBreadcrumb,
        usersModuleBreadcrumb,
        buildUserBreadcrumb(user),
      ]}
    >
      <EditUserAccessForm user={user} />
    </EditFormPageLayout>
  )
}

export default EditUserFormPage

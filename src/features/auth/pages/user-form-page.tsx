import UserForm from '../components/user-access-form'
import {
  accessControlBreadcrumb,
  usersModuleBreadcrumb,
} from '../lib/config/breadcrumbs'
import { accessControlPermissionProvider } from '../lib/config/permissionProvider'
import { FormPageLayout } from '@/components'

const UserFormPage = () => {
  return (
    <FormPageLayout
      title="Crear acceso"
      permissionProvider={accessControlPermissionProvider}
      breadcrumbs={[accessControlBreadcrumb, usersModuleBreadcrumb]}
    >
      <UserForm />
    </FormPageLayout>
  )
}

export default UserFormPage

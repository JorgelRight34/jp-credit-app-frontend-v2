import UserForm from '../components/create-user-form'
import {
  accessControlBreadcrumb,
  usersModuleBreadcrumb,
} from '../lib/config/breadcrumbs'
import { accessControlPermissionProvider } from '../lib/config/permissionProvider'
import { FormPageLayout } from '@/components'

const CreateUserFormPage = () => {
  return (
    <FormPageLayout
      title="acceso"
      mode="create"
      permissionProvider={accessControlPermissionProvider}
      breadcrumbs={[accessControlBreadcrumb, usersModuleBreadcrumb]}
    >
      <UserForm  />
    </FormPageLayout>
  )
}

export default CreateUserFormPage

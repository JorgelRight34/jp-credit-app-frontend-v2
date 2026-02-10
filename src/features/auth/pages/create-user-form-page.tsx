import CreateUserAccessForm from '../components/create-user-form'
import {
  accessControlBreadcrumb,
  usersModuleBreadcrumb,
} from '../lib/config/breadcrumbs'
import { accessControlPermissionProvider } from '../lib/config/permissionProvider'
import { CreateFormPageLayout } from '@/components'

const CreateUserFormPage = () => {
  return (
    <CreateFormPageLayout
      title="acceso"
      permissionProvider={accessControlPermissionProvider}
      breadcrumbs={[accessControlBreadcrumb, usersModuleBreadcrumb]}
    >
      <CreateUserAccessForm />
    </CreateFormPageLayout>
  )
}

export default CreateUserFormPage

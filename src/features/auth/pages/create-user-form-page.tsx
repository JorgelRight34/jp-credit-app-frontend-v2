import CreateUserAccessForm from '../components/create-user-form'
import { accessControlPermissionProvider } from '../lib/config/permissionProvider'
import { CreateFormPageLayout } from '@/components'
import { accessControlBreadcrumb } from './access-control-page'
import { usersModuleBreadcrumb } from './user-page'

const CreateUserFormPage = () => {
  return (
    <CreateFormPageLayout
      title="Acceso"
      permissionProvider={accessControlPermissionProvider}
      breadcrumbs={[accessControlBreadcrumb, usersModuleBreadcrumb]}
    >
      <CreateUserAccessForm />
    </CreateFormPageLayout>
  )
}

export default CreateUserFormPage

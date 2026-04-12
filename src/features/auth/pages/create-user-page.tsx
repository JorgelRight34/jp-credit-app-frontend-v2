import CreateUserAccessForm from '../components/create-user-form'
import { CreateFormPageLayout } from '@/components'
import { accessControlBreadcrumb } from './access-control-page'
import { usersModuleBreadcrumb } from './user-page'

const CreateUserPage = () => (
  <CreateFormPageLayout
    title="Acceso"
    breadcrumbs={[accessControlBreadcrumb, usersModuleBreadcrumb]}
  >
    <CreateUserAccessForm />
  </CreateFormPageLayout>
)

export default CreateUserPage

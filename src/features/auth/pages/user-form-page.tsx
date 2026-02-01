import UserForm from '../components/user-access-form'
import { accessControlPermissionProvider } from '../lib/config/permissionProvider'
import { FormPageLayout } from '@/components'

const UserFormPage = () => {
  return (
    <FormPageLayout
      title="Crear Acceso"
      permissionProvider={accessControlPermissionProvider}
      options={[]}
    >
      <UserForm />
    </FormPageLayout>
  )
}

export default UserFormPage

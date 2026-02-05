import RoleForm from '../components/role-form'
import {
  accessControlBreadcrumb,
  rolesModuleBreadcrumb,
} from '../lib/config/breadcrumbs'
import { rolesPermissionProvider } from '../lib/config/permissionProvider'
import { FormPageLayout } from '@/components'

const RoleFormPage = () => {
  return (
    <FormPageLayout
      title="Crear grupo"
      permissionProvider={rolesPermissionProvider}
      breadcrumbs={[accessControlBreadcrumb, rolesModuleBreadcrumb]}
    >
      <RoleForm />
    </FormPageLayout>
  )
}

export default RoleFormPage

import RoleForm from '../components/role-form'
import {
  accessControlBreadcrumb,
  rolesModuleBreadcrumb,
} from '../lib/config/breadcrumbs'
import { rolesPermissionProvider } from '../lib/config/permissionProvider'
import type { Role } from '../models/role'
import { CreateFormPageLayout } from '@/components'

const CreateRoleFormPage = ({ role }: { role?: Role }) => {
  return (
    <CreateFormPageLayout
      title="grupo"
      permissionProvider={rolesPermissionProvider}
      breadcrumbs={[accessControlBreadcrumb, rolesModuleBreadcrumb]}
    >
      <RoleForm role={role} />
    </CreateFormPageLayout>
  )
}

export default CreateRoleFormPage

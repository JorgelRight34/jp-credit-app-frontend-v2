import { EditFormPageLayout } from '@/components'
import RoleForm from '../components/role-form'
import {
  accessControlBreadcrumb,
  buildRoleBreadcrumb,
  rolesModuleBreadcrumb,
} from '../lib/config/breadcrumbs'
import { rolesPermissionProvider } from '../lib/config/permissionProvider'
import type { Role } from '../models/role'

const EditRoleFormPage = ({ role }: { role: Role }) => {
  return (
    <EditFormPageLayout
      title={role.name}
      permissionProvider={rolesPermissionProvider}
      breadcrumbs={[
        accessControlBreadcrumb,
        rolesModuleBreadcrumb,
        buildRoleBreadcrumb(role),
      ]}
    >
      <RoleForm role={role} />
    </EditFormPageLayout>
  )
}

export default EditRoleFormPage

import RoleForm from '../components/role-form'
import {
  accessControlBreadcrumb,
  createRoleBreadcrumb,
  rolesModuleBreadcrumb,
} from '../lib/config/breadcrumbs'
import { rolesPermissionProvider } from '../lib/config/permissionProvider'
import type { Role } from '../models/role'
import { FormPageLayout } from '@/components'

const RoleFormPage = ({ role }: { role?: Role }) => {
  return (
    <FormPageLayout
      title={role ? role.name : 'grupo'}
      mode={role ? 'edit' : 'create'}
      permissionProvider={rolesPermissionProvider}
      breadcrumbs={
        role
          ? [
              accessControlBreadcrumb,
              rolesModuleBreadcrumb,
              createRoleBreadcrumb(role),
            ]
          : [accessControlBreadcrumb, rolesModuleBreadcrumb]
      }
    >
      <RoleForm role={role} />
    </FormPageLayout>
  )
}

export default RoleFormPage

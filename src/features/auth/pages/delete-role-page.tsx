import { DeleteFormPageLayout } from '@/components'
import { PropsWithRole } from '../models/role'
import DeleteRoleForm from '../components/delete-role-form'
import { accessControlBreadcrumb } from './access-control-page'
import { buildRoleBreadcrumb, rolesModuleBreadcrumb } from './role-page'

const DeleteRolePage = ({ role }: PropsWithRole) => (
  <DeleteFormPageLayout
    breadcrumbs={[
      accessControlBreadcrumb,
      rolesModuleBreadcrumb,
      buildRoleBreadcrumb(role),
    ]}
    title={role.name}
  >
    <DeleteRoleForm role={role} />
  </DeleteFormPageLayout>
)

export default DeleteRolePage

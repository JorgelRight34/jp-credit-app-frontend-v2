import { EditFormPageLayout } from '@/components'
import type { PropsWithRole } from '../models/role'
import { accessControlBreadcrumb } from './access-control-page'
import { buildRoleBreadcrumb, rolesModuleBreadcrumb } from './role-page'
import EditRoleForm from '../components/edit-role-form'

const EditRoleFormPage = ({ role }: PropsWithRole) => {
  return (
    <EditFormPageLayout
      title={role.name}
      breadcrumbs={[
        accessControlBreadcrumb,
        rolesModuleBreadcrumb,
        buildRoleBreadcrumb(role),
      ]}
    >
      <EditRoleForm role={role} />
    </EditFormPageLayout>
  )
}

export default EditRoleFormPage

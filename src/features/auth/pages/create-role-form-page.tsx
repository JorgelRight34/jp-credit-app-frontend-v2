import RoleForm from '../components/role-form'
import {
  accessControlBreadcrumb,
  rolesModuleBreadcrumb,
} from '../lib/config/breadcrumbs'
import { rolesPermissionProvider } from '../lib/config/permissionProvider'
import type { Role } from '../models/role'
import { CreateFormPageLayout, Tab, Tabs } from '@/components'

const CreateRoleFormPage = ({ role }: { role?: Role }) => {
  return (
    <CreateFormPageLayout
      title="Grupo"
      permissionProvider={rolesPermissionProvider}
      breadcrumbs={[accessControlBreadcrumb, rolesModuleBreadcrumb]}
    >
      <Tabs defaultActiveKey="form">
        <Tab eventKey="form" title="Formulario">
          <RoleForm role={role} />
        </Tab>
      </Tabs>
    </CreateFormPageLayout>
  )
}

export default CreateRoleFormPage

import RoleForm from '../components/role-form'
import { rolesPermissionProvider } from '../lib/config/permissionProvider'
import type { Role } from '../models/role'
import {
  CreateFormPageLayout,
  Tab,
  Tabs,
  TabPanel,
  TabsList,
} from '@/components'
import { accessControlBreadcrumb } from './access-control-page'
import { rolesModuleBreadcrumb } from './role-page'

const CreateRoleFormPage = ({ role }: { role?: Role }) => {
  return (
    <CreateFormPageLayout
      title="Crear grupo"
      permissionProvider={rolesPermissionProvider}
      breadcrumbs={[accessControlBreadcrumb, rolesModuleBreadcrumb]}
    >
      <Tabs defaultActiveIndex={0}>
        <TabsList>
          <Tab index={0}>Formulario</Tab>
        </TabsList>
        <TabPanel index={0}>
          <RoleForm role={role} />
        </TabPanel>
      </Tabs>
    </CreateFormPageLayout>
  )
}

export default CreateRoleFormPage

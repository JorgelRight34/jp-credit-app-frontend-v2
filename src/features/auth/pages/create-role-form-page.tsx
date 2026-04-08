import RoleForm from '../components/create-role-form'
import { rolesPermissionProvider } from '../lib/config/permissionProvider'
import {
  CreateFormPageLayout,
  Tab,
  Tabs,
  TabPanel,
  TabsList,
} from '@/components'
import { accessControlBreadcrumb } from './access-control-page'
import { rolesModuleBreadcrumb } from './role-page'

const CreateRoleFormPage = () => {
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
          <RoleForm />
        </TabPanel>
      </Tabs>
    </CreateFormPageLayout>
  )
}

export default CreateRoleFormPage

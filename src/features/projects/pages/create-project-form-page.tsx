import {
  CreateFormPageLayout,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from '@/components'
import { projectsPermissionProvider } from '../lib/config/permissionProvider'
import ProjectForm from '../components/project-form'
import { projectsBreadcrumb } from './projects-page'

const CreateProjectFormPage = () => {
  return (
    <CreateFormPageLayout
      title="Crear proyecto"
      breadcrumbs={[projectsBreadcrumb]}
      permissionProvider={projectsPermissionProvider}
    >
      <Tabs>
        <TabsList>
          <Tab index={0}>Formulario</Tab>
        </TabsList>
        <TabPanel index={0}>
          <ProjectForm />
        </TabPanel>
      </Tabs>
    </CreateFormPageLayout>
  )
}

export default CreateProjectFormPage

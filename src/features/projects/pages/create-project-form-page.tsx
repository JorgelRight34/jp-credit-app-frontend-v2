import { CreateFormPageLayout, Tab, Tabs } from '@/components'
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
      <Tabs defaultActiveKey="form">
        <Tab eventKey="form" title="Formulario">
          <ProjectForm />
        </Tab>
      </Tabs>
    </CreateFormPageLayout>
  )
}

export default CreateProjectFormPage

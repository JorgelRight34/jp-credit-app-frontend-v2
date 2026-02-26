import { CreateFormPageLayout, Tab, Tabs } from '@/components'
import { projectsPermissionProvider } from '../lib/config/permissionProvider'
import { projectsBreadcrumb } from '../lib/config/breadcrumbs'
import ProjectForm from '../components/project-form'

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

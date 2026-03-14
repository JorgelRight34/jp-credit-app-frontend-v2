import { CreateFormPageLayout, PagePanel } from '@/components'
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
      <PagePanel>
        <ProjectForm />
      </PagePanel>
    </CreateFormPageLayout>
  )
}

export default CreateProjectFormPage

import { CreateFormPageLayout } from '@/components'
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
      <ProjectForm />
    </CreateFormPageLayout>
  )
}

export default CreateProjectFormPage
